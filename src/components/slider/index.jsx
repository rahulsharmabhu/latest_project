import React, { useEffect, useState } from "react";
import CInput from "../custom-input";
import { videoInfoValidations } from "../../modules/wave-detection/download-form/validations";
import { useOnAngleClickState } from "../../app-redux/hooks/useOnAngleClickState";
import { useOnVideoClickState } from "../../app-redux/hooks/useOnVideoClickState";

const colors = {
  blue: "#2E6FA1",
};

const Slider = ({
  value,
  setValue,
  range,
  unit,
  maxSliderValue,
  minSliderValue,
  numSteps,
}) => {
  const [waveFrequency, setWaveFrequency] = useState(minSliderValue);
  const [messages, setMessages] = useState("");
  const { setAngleClickState } = useOnAngleClickState();
  const { angleState } = useOnAngleClickState();
  const { videoState, setVideoClickState } = useOnVideoClickState();

  const numIntervals = maxSliderValue / numSteps;

  // calculate the steps value for range slider
  const createSliderWithSteps = () => {
    const slider = [];

    for (let i = minSliderValue; i <= numIntervals; i++) {
      const value = i * numSteps;
      slider.push(value);
    }

    return slider;
  };

  const sliderSteps = createSliderWithSteps();

  //handle values when range slider is moved 
  const handleRangeChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue);
    if (inputValue === "") {
      setValue(minSliderValue);
      setWaveFrequency(minSliderValue);
      document.documentElement.style.setProperty(
        "--slider-percentage",
        `${minSliderValue}`
      );
    } else if (!isNaN(numericValue)) {
      setValue(numericValue.toFixed(1));
      setWaveFrequency(numericValue.toFixed(1));
      document.documentElement.style.setProperty(
        "--slider-percentage",
        `${numericValue}%`
      );
    }
  };

  // setting value of range and slider to min when video is changed
  useEffect(() => {
    if (videoState) {
      setValue(minSliderValue);
      setWaveFrequency(minSliderValue);
    }
  }, [videoState?.name]);

  // get value from slider or input and make the corresponding degree value color blue
  const getDegreeColor = (degreeValue) => {
    if (value >= Math.abs(degreeValue)) {
      return colors.blue; // Blue color
    }
    return ""; // Default color
  };

  useEffect(() => {
    if (value >= Math.abs(maxSliderValue)) setWaveFrequency(maxSliderValue);
  }, [value]);

  return (
    <>
      <div className="container wave_frequency_wrapper">
        <div className="row">
          <div className="form-group">
            <label className="text-secondary" htmlFor="exampleInputPassword1">
              Wave Frequency
            </label>
            <CInput
              name="waveFrequency"
              className="custom-input form-control form-control-sm"
              value={value}
              onChange={handleRangeChange}
              type="text"
            />
          </div>
        </div>

        <div className="row">
          <div className="px-3">
            <input
              style={{ width: "100%" }}
              type="range"
              min={minSliderValue}
              step={numSteps}
              max={maxSliderValue}
              value={value}
              onChange={handleRangeChange}
            />
          </div>

          <div className="d-flex slider-range">
            {sliderSteps.map((stepValue, index) => {
              const degreeValue = (-stepValue).toFixed(1); // Convert to one decimal number
              return (
                <span
                  key={index}
                  className="slider-range-span"
                  style={{
                    paddingTop: "5px",
                    color: getDegreeColor(degreeValue), // Pass the one decimal number to getDegreeColor
                    transform: "rotate(90deg)",
                  }}
                >
                 -
                </span>
              );
            })}
          </div>

          <div className="d-flex text-center slider-range ">
            {sliderSteps.map((stepValue, index) => {
              const degreeValue = (stepValue).toFixed(1); // Convert to one decimal number
              return (
                <span
                  key={index}
                  className="slider-range-span"
                  style={{
                    display: "block",
                    marginBottom: "20%",
                    paddingTop: "5px",
                    color: getDegreeColor(degreeValue), // Pass the one decimal number to getDegreeColor
                  }}
                >
                  {degreeValue}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
