import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useOnAngleClickState } from "../../../app-redux/hooks/useOnAngleClickState";
import { useOnVideoClickState } from "../../../app-redux/hooks/useOnVideoClickState";
import { useOnDetectionClickState } from "../../../app-redux/hooks/useOnDetectionClickState";
import { useOnDownloadClickState } from "../../../app-redux/hooks/useOnDownloadClickState";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  formatTime,
  removeActiveAngleClass,
} from "../../../components/utils/app.util";
import "../../../assets/css/wave.css";
import * as XLSX from "xlsx";

const VideoPlayer = () => {
  const { angleState, setAngleClickState } = useOnAngleClickState();
  const { detectionState, setDetectionUpdateClickState, resetDetection } = useOnDetectionClickState();
  const { setDownloadClickState } = useOnDownloadClickState();
  const [currentTime, setCurrentTime] = useState(0);
  const { videoState, setVideoClickState } = useOnVideoClickState();
  const [duration, setDuration] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [detc, setDetc] = useState({});
  const [extractedData, setExtractedData] = useState([]);
  const [isReplaying, setIsReplaying] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileRemoved, setFileRemoved] = useState(false);

  const player = useRef(null);
  const fileInputRef = useRef(null);

  const setDetectionsArray = () => {

    const detection = {
      time: Math.ceil(player.current.getCurrentTime() * 2) / 2,
      angle: angleState && angleState.angle !== null ? angleState.angle : "",
      name: videoState.name || "",
      waveFrequency:
        angleState && angleState.waveFrequency !== null
          ? angleState?.waveFrequency
          : "",
    };
    setDetc(detection);
    // setDetectionUpdateClickState(prevState => [...prevState, detection]);
    setDetectionUpdateClickState({ ...detection });
  };

  useEffect(() => {

    if (
      player.current &&
      angleState?.angle !== null &&
      angleState?.angle !== undefined &&
      isPlay &&
      !isPaused
    ) {
      setDetectionsArray(); // Instant call when the angle changes
    }
  }, [angleState?.angle, angleState?.waveFrequency, fileUploaded]);

  let interval;
  useEffect(() => {

    if (
      player.current &&
      angleState?.angle !== null &&
      angleState?.angle !== undefined &&
      isPlay &&
      !isPaused
    ) {
      interval = setInterval(() => {
        setDetectionsArray(); // Call the function every 500 milliseconds
      }, 500);
    }

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts or the dependencies change
    };
  }, [angleState?.angle, isPlay, isPaused, angleState?.waveFrequency]);

  const handleDuration = (duration) => {
    setDuration(duration);
    setVideoClickState({ ...videoState, duration, duration });
  };

  const handleProgress = ({ playedSeconds }) => {
    setCurrentTime(playedSeconds);
  };

  const handleDownload = () => {
    const timeStamp = Date.now();
    setDownloadClickState(timeStamp);
  };

  // Latest
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await readFile(file);
      if (data && data.length > 0) {
        setExtractedData(data); // Update the extracted data state
        setFileUploaded(true);
      }
    } else {
      setFileUploaded(false);
    }
  };

  let hasInitialDelay = false;
  let customInterval;

  useEffect(() => {

    if (isReplaying && isPlay) {
      customInterval = setInterval(() => {
        if (!hasInitialDelay) {
          hasInitialDelay = true;
          return;
        }
        const ctime = Math.ceil(player.current.getCurrentTime() * 2) / 2;

        const found = extractedData.find((item) => item.time === ctime);
        if (found) {
          setAngleClickState({
            ...angleState,
            angle: found.angle,
            waveFrequency: found.waveFrequency,
            isReplaying: true,
          });

          const detection = {
            time: ctime,
            angle: found.angle !== null ? found.angle : "",
            name: videoState.name || "",
            waveFrequency:
              found && found.waveFrequency !== null ? found?.waveFrequency : "",
          };
          setDetc(detection);
          setDetectionUpdateClickState({ ...detection });
          console.log("areeb is testing");
        }
      }, 500);
    }

    return () => {
      clearInterval(customInterval); // Clear the interval when the component unmounts or the dependencies change
    };
  }, [isReplaying, isPlay, fileUploaded]);

  // const handleRemoveFile = () => {
  //   // debugger
  //   setIsPlay(false)
  //   // Reset the file input to clear the selected file
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = null;
  //   }
  //   clearInterval(customInterval);
  //   clearInterval(interval);
  //   // setExtractedData([])
  //   setFileUploaded(false);
  //   // console.log("extractedData1", extractedData);
  //   // resetting data
  //   const detection1 = {
  //     time: null,
  //     angle: null,
  //     name: videoState.name || "",
  //     waveFrequency: null,
  //   };
  //   setDetc(detection1);
  //   setExtractedData(null);
  //   setAngleClickState(null);
  //   if (player.current) {
  //     player.current.seekTo(0);
  //   }
  //   setDuration(0);
  //   setCurrentTime(0)
  // };

  const handleRemoveFile = () => {
    setIsPlay(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    clearInterval(customInterval);
    clearInterval(interval);
  
    // Set extractedData to an empty array
    setExtractedData([]);
    setFileUploaded(false);
  
    // Reset the other states as well
    const detection1 = {
      time: null,
      angle: null,
      waveFrequency: null,
    };
    setDetc(detection1);
    setAngleClickState(null);
  
    // Reset the video playback time to 0 seconds
    if (player.current) {
      player.current.seekTo(0);
    }
  
    // Reset the duration and current time
    // setDuration(0);
    setCurrentTime(0);
  };
  


  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Updated time and angle column
        const timeColumn = "A"; // Time column in column A
        const angleColumn = "B"; // Angle column in column B
        const waveFrequencyColumn = "C"; // Angle column in column B

        // Create an array to store the extracted data
        const extractData = [];
        let row = 6; // Start from row 6

        while (true) {
          const timeCell = sheet[timeColumn + row];
          const angleCell = sheet[angleColumn + row];
          const waveFrequencyCell = sheet[waveFrequencyColumn + row];
          const timeValue = timeCell ? timeCell.v : null;
          const angleValue = angleCell ? angleCell.v : null;
          const waveFrequencyValue = waveFrequencyCell
            ? waveFrequencyCell.v
            : null;

          // If the time value is null, it means there's no more data in the time column
          if (timeValue === null) {
            break;
          }

          // Add the row to the extractData array
          extractData.push({
            time: parseFloat(timeValue),
            angle: angleValue,
            waveFrequency: waveFrequencyValue,
          });

          row++; // Move to the next row
        }

        resolve(extractData);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  useEffect(() => {
    // debugger
    if (!fileUploaded) {
      setDetc({});
      clearInterval(customInterval);
      clearInterval(interval);
      setExtractedData([])
      // setDetectionUpdateClickState([]);

      console.log("extractedData1", extractedData);
      // console.log("detectionState1", detectionState);
      // setDuration(0);

    }
  }, [fileUploaded]);


  return (
    <PerfectScrollbar>
      <div className="col-12">
        <div className="player-wrapper">
          <ReactPlayer
            ref={player}
            className="react-player"
            url={videoState?.media}
            width="100%"
            height="100%"
            controls={true}
            playing={isPlay} // Use the `playing` prop to control playback
            onProgress={handleProgress}
            onDuration={handleDuration}
            onPause={() => {
              setIsPaused(true);
              setIsPlay(false);
              setAngleClickState(null);
              removeActiveAngleClass();
              setVideoClickState({ ...videoState, duration, duration, isPlay });
              setIsReplaying(false);
            }}
            onPlay={() => {
              setIsPlay(true);
              setIsPaused(false);
              setVideoClickState({ ...videoState, duration, duration, isPlay });
              setIsReplaying(true);
            }}
          />
          <div className="container" style={{ height: "200px" }}>
            {videoState ? (
              <>
                <div className="row text-center">
                  <div className="col-4">
                    <h5 className="list-bg text-secondary">Current Time: </h5>
                    <h6 className="list-bg">{detc?.time}</h6>
                  </div>
                  <div className="col-4">
                    <h5 className="list-bg text-secondary">Current angle: </h5>
                    {/* <h6 className="list-bg">{isReplaying ?  extractedData[displayedDataIndex].angle : detc?.angle}</h6> */}

                    <h6 className="list-bg">{detc?.angle}</h6>
                  </div>
                  <div className="col-4">
                    <h5 className="list-bg text-secondary">Progress: </h5>
                    <h6 className="list-bg">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </h6>
                  </div>
                </div>
                <div className="row mt-2">
                  <button
                    type="button"
                    className="btn btn-primary w-25"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                </div>
                {!fileUploaded ? (
                  <div className="row mt-2">
                    <button
                      type="button"
                      className="btn btn-primary w-25"
                    // disabled={!isFileUploaded}
                    >
                      <input
                        ref={fileInputRef}
                        className="w-100"
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileUpload}
                      />
                    </button>
                  </div>
                ) : (
                  <div className="row mt-2">
                    <button
                      type="button"
                      className="btn btn-primary w-25"
                      onClick={handleRemoveFile}
                    >
                      Remove File
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="row video_not_selected convention_14">
                No Video Selected
              </div>
            )}
          </div>
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default VideoPlayer;
