import React, { useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar'
import config from "../../../config";
import CollapsibleList from "../../../components/list-items/index";
import Alert from "../../../components/alert";
import { useOnVideoClickState } from "../../../app-redux/hooks/useOnVideoClickState";
import { useOnAngleClickState } from "../../../app-redux/hooks/useOnAngleClickState";
import videoData from './list.json'
import { useOnDetectionClickState } from "../../../app-redux/hooks/useOnDetectionClickState";


const VideoSection = () => {

  const [videoList, setVideoList] = useState([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [object, setObj] = useState({});
  const { videoState, setVideoClickState } = useOnVideoClickState();
  const { angleState, setAngleClickState } = useOnAngleClickState();
  const { resetDetection } = useOnDetectionClickState();



  // useEffect(() => {
  //   setVideoList(videoData);

  // }, []);

  
  const fetchData = async () => {
    try {
      const response = await fetch(config.VITE_VIDEO_LIST_URL);
      const data = await response.json();
      setVideoList(data)
    } catch (error) {
    }

  };
  useEffect(() => {
    fetchData();

  }, []);


// Alert system 

const handleClicked = (obj) => {
  setObj(obj);
  if (videoState?.name === null || videoState?.name === undefined) {
    setModalOpen(false);
    setVideoClickState(obj);
  } else if (videoState?.name !== obj.name) {
    setModalOpen(true);
  } else {
    setModalOpen(false);
  }
};

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleOkClick = () => {
    setModalOpen(false);
    setVideoClickState(object);
    setAngleClickState(null);
    resetDetection();
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

    // Call handleClicked again when angleState?.isReplaying changes
    // useEffect(() => {
    //   if (!angleState?.isReplaying) {
    //     handleClicked(object);
    //   }
    // }, [angleState?.isReplaying, object]);

  return (
    <>
     <Alert
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        handleOkClick={handleOkClick}
        handleCancelClick={handleCancelClick}
      />
    
    <PerfectScrollbar className="video_section_wrapper convention_13">
      <CollapsibleList items={videoList} object={object} depth={0} onItemClicked={handleClicked} />
    </PerfectScrollbar>

    </>
  );
};

export default VideoSection;
