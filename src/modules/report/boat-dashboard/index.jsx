import React from "react";
import "./guage.css";
import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import lastKnownValue from "./nmea-parser";
import PerfectScrollbar from "react-perfect-scrollbar";
import Map from "../../../components/map";
import GaugeComponent from 'react-gauge-component';
import GaugeBattery from "../../../components/guage-battery";
import VerticalGauge from "../../../components/vertical-guage-bar";
import CompassSvg from "../../wave-detection/direction-detection/compass-svg";
import Containers from "../../../assets/svgs/containers.svg"
import StatusFrame from "../../../assets/svgs/status-frame.svg"
import VerticalProgressBar from "../../../components/vertical-progress-bar";
import TrimSvg from "./trim-svg";
import WaveAxis from "./wave-axis";
import CInput from "../../../components/custom-input";
import CSelect from "../../../components/custom-select";
import { get_vessel_options } from "../../../components/utils/app.options";
import { Label } from "reactstrap";

const CircularGaugeComp = () => {
  const [batteryValue, setBatteryValue] = useState(0);
  const [fuelValue, setFuelValue] = useState(0);
  const [trimValue, setTrimValue] = useState(0);
  const [sogValue, setSOGValue] = useState(0);
  const { lastKnownValues } = lastKnownValue();
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isPlaybackActive, setIsPlaybackActive] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleLiveClick = () => {
    setIsLiveActive(true);
    setIsPlaybackActive(false);
  };

  const handlePlaybackClick = () => {
    setIsLiveActive(false);
    setIsPlaybackActive(true);
  };


  useEffect(() => {
    if (lastKnownValues.Voltage === "N/A") {
      setBatteryValue(0)
    } else {
      setBatteryValue(parseInt(lastKnownValues.Voltage))
    }
    if (lastKnownValues.Tilt_Trim === "N/A") {
      setTrimValue(0)
    } else {
      setTrimValue(parseInt(lastKnownValues.Tilt_Trim))
    }
    if (lastKnownValues.FuelRate === "N/A") {
      setFuelValue(0)
    } else {
      setFuelValue(parseInt(lastKnownValues.FuelRate))
    }
    if (lastKnownValues.SOG === "N/A") {
      setSOGValue(0)
    } else {
      setSOGValue(parseInt(lastKnownValues.SOG))

    }
  }, [lastKnownValues])

  const kbitsToMbits = () => {
    const value = parseFloat(lastKnownValues.Speed)
    return  value.toFixed(0) + ' RPM';
  }


  return (
    <>
      <PerfectScrollbar options={{ wheelPropagation: true }}
        containerRef={ref => {
          if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect
            ref.getBoundingClientRect = () => {
              const original = ref._getBoundingClientRect()
              return { ...original, height: Math.floor(original.height) }
            }
          }
        }}>
        <div className="container-fluid">
          <div className="row px-2">
            <div className="col-md-12 border border-dark nav mt-2 d-flex justify-content-between">
              <div className="d-flex my-2">

                {selectedType ? (
                  <p className="mb-0 h4">{selectedType}</p>
                ) : (
                  <p className="mb-0 h4">Vessel Name</p>
                )}

                {isLiveActive && (
                  <button type="button" className="btn btn-danger active ms-2 px-4" data-bs-toggle="button" autocomplete="off" aria-pressed="true">Live</button>
                )}

                {isPlaybackActive && (
                  <div>
                    <Icon icon="gg:voicemail-r" width="52" height="34" />
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-end my-2">
                <Icon icon="noto:ten-oclock" width="28" height="28" />
                <p className="mb-0 d-flex align-items-center ms-2">{lastKnownValues.Time || "N/A"}&nbsp;  &nbsp;</p>
                <Icon icon="emojione:calendar" width="28" height="28" />
                <p className="mb-0 d-flex align-items-center ms-2"> &nbsp;{lastKnownValues.Date || "N/A"}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3 nav">
              <div className="row border border-dark  mx-1">
                <div className="col-md-12 p-3">
                  <div className="row">
                    <div className="container">
                      <div className="row p-2">
                        <div className="col-md-4 px-0">
                          <button
                            className={`btn w-100 rounded-0 ${isLiveActive ? 'btn-primary' : 'btn-dark'}`}
                            onClick={handleLiveClick}
                          >
                            Live
                          </button>
                        </div>
                        <div className="col-md-4 px-0">
                          <button
                            className={`btn w-100 rounded-0 ${isPlaybackActive ? 'btn-primary' : 'btn-dark'}`}
                            onClick={handlePlaybackClick}
                          >
                            Playback
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4 mb-3">
                      <div className="row w-100">
                        <div className="col-md-12">
                          <div className="flex flex-col">
                            <div className="">
                              <Label className='form-label' for='type'>
                                Select Vessel
                              </Label>
                              <CSelect
                                id="type"
                                name="type"
                                value={selectedType}
                                onChange={handleTypeChange}
                                defaultOption="Select a type"
                                type="select"
                                options={get_vessel_options()}
                                optionLabel="name"
                                optionValue="name"
                              />
                            </div>
                            <div className="mt-3">
                              <Label className='form-label' for='selectVessel'>
                                Select Recording
                              </Label>
                              <CInput
                                placeholder=""
                                id="selectVessel"
                                name="selectVessel"
                                className="login-input form-control border"
                                rows={5}
                                type="textarea"
                              />
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                              <button
                                className={`btn w-50 btn-primary`}
                              >
                                Open
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 nav">
              {/* <div className="row border border-dark"> */}
              <div className="col-md-12 py-3">
                <div className="row w-100">
                  <div className="col-md-12"><span className="badge w-50 text-start boat-dashboard-heading-bg boat-dashboard-heading-text">Engine RPM</span></div>
                </div>

                <div className="row w-100">
                  <div className="col-md-12 mt-1 d-flex justify-content-center"><p className="">SOG 7</p></div>
                </div>

                <div className="row w-100">
                  <div className="col-md-8 d-flex justify-content-start mb-3 ">
                    <GaugeComponent
                      className="mt-2"
                      id="gauge-component-radial2"
                      value={parseFloat(lastKnownValues.Speed)}
                      type="semicircle"
                      style={{width: 200}}
                      labels={{
                        valueLabel: {
                          style: {fontSize: "22px", fill:"#fff"},
                          formatTextValue: kbitsToMbits
                        },
                        tickLabels: {
                          ticks: [
                            { value: 20 },
                            { value: 50 },
                            { value: 80 },
                            { value: 100 }
                          ]
                        }
                      }}
                      arc={{
                        colorArray: ['#fc0d0d', '#ffdede'],
                        nbSubArcs: 90,
                        padding: 0.01,
                        width: 0.3
                      }}
                      pointer={{ animationDelay: 0 }}
                    />
                  </div>

                  <div className="col-md-4">
                    <button type="button" className="btn btn-danger w-100"><p className="mb-0">Idle</p></button>
                    <button type="button" className="btn btn-secondary w-100 mt-1"><p className="mb-0"><small>In Gear</small></p></button>
                  </div>

                </div>
                <div className="row w-100">
                  <p>Total Engine Hours &nbsp; &nbsp; 126</p>
                  <p>Total Engine Idle Hours &nbsp; &nbsp; 45</p>

                </div>
                <div className="row w-100">
                  <div className="col-md-12">
                    <span className="badge w-50 text-start boat-dashboard-heading-bg boat-dashboard-heading-text">Acceleration</span>
                  </div>
                  <div className="col-md-12 d-flex">
                    <div className="d-flex justify-content-start align-items-start mt-3">
                      <VerticalProgressBar fillPercentage={sogValue} fillColor="blue" axis="X" desc="Roll" />
                      <VerticalProgressBar fillPercentage={sogValue} fillColor="red" axis="Y" desc="Sway" />
                      <VerticalProgressBar fillPercentage={sogValue} fillColor="green" axis="Z" desc="Surge" showRuler={true} />
                    </div>
                    {/* <div className="vr h-100 mx-3"></div> */}
                    <div className="d-flex justify-content-center">
                      <div className="px-0 mx-0">
                        <WaveAxis />
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* </div> */}

            </div>
            <div className="col-sm-3 nav">
              <div className="row border border-dark">
                <div className="col-md-12 p-3">
                  <div className="row">
                    <div className="col-md-12">
                      <span className="badge w-50 text-start boat-dashboard-heading-bg boat-dashboard-heading-text">Trim/Tilt</span>
                    </div>
                    <div className="row mt-3">
                      <p className="h5">Trim &nbsp; {trimValue}</p>
                    </div>

                    <div className="col-md-12">
                      <span className="badge w-25 text-start boat-dashboard-heading-bg boat-dashboard-heading-text">Battery</span>
                    </div>
                    <div className="row mt-3 ">
                      <p className="h5">Voltage &nbsp; {batteryValue}v</p>
                      {/* <div className="d-flex justify-content-center">
                        <GaugeBattery percentage={batteryValue} />
                      </div> */}
                    </div>

                    <div className="col-md-12">
                      <span className="badge w-25 text-start boat-dashboard-heading-bg boat-dashboard-heading-text">Fuel</span>
                    </div>
                    <div className="d-flex justify-content-start ms-3 mt-3" style={{ height: "25rem" }}>
                      <VerticalGauge percentage={fuelValue} />

                      <div className="d-flex justify-content-center flex-column ms-5">
                        <div className="d-flex flex-column mb-1">
                          <p className="mb-0 boat-dashboard-heading-text">Litres remaining</p>
                          <p className="h5">0.09 L</p>
                        </div>
                        <div className="d-flex flex-column mb-1">
                          <p className="mb-0 boat-dashboard-heading-text">Litres per Hour</p>
                          <p className="h5">{fuelValue} L</p>
                        </div>
                        {/* <div className="d-flex flex-column mb-1">
                          <p className="mb-0 boat-dashboard-heading-text">Range</p>
                          <p className="h5">126 km</p>
                        </div> */}
                      </div>
                    </div>
                    {/* <div className="col-md-12 mt-1 mb-3">
                      <TrimSvg degrees={trimValue} />
                    </div> */}
                  </div>
                </div>
              </div>


              {/* <div className="row border border-dark nav mt-2 me-1">
                <div className="col-md-12 p-3">
                  <div className="row">
                    <div className="col-md-12">
                      <span className="badge boat-dashboard-heading-bg boat-dashboard-heading-text">Battery</span>
                    </div>
                    <div className="row mt-2 mb-5 pt-4 pb-5">
                      <div className="d-flex justify-content-center">
                        <GaugeBattery percentage={batteryValue} />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-sm-3 nav">
              <div className="row border border-dark">
                <div className="col-md-12 p-3">
                  <div className="row ">
                    <div className="col-md-7">
                      <span className="badge boat-dashboard-heading-bg boat-dashboard-heading-text">Sea State and Warnings</span>
                    </div>
                    {/* <div className="col-md-5">
                      <span className="badge boat-dashboard-heading-bg boat-dashboard-heading-text">Warning</span>
                    </div> */}

                    <div className="row">
                      <div className="col-md-7">
                        <div className="d-flex justify-content-center flex-column mt-2">
                          <CompassSvg isShow={false} />
                          <div className="d-flex justify-content-between mt-2">
                            <div className="d-flex flex-column">
                              <p className="mb-0">Wave Height</p>
                              <p className="h4">5.5m</p>
                            </div>
                            <div className="d-flex flex-column">
                              <p className="mb-0">Wave Period</p>
                              <p className="h4">7.5 sec</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 d-flex">
                        {/* <div className="vr h-100 me-4"></div> */}
                        <div className="h-75 w-75 rounded mt-4">
                          <div className="pt-3">
                            <div className="d-flex justify-content-center">
                              <Icon icon="fa6-solid:person" width="28" height="28" />
                              <img src={StatusFrame} alt="StatusFrame SVG" />
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                              <img src={Containers} alt="Containers SVG" style={{ width: "28px", height: "28px" }} />
                              <img src={StatusFrame} alt="StatusFrame SVG" />
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                              <Icon icon="ri:ship-line" width="28" height="28" />
                              <img src={StatusFrame} alt="StatusFrame SVG" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 me-1" style={{ height: "22.5rem", width: "28rem" }}>
                {/* <div className="col-md-12"> */}
                {/* UNCOMMENT BELOW LINE TO MAKE MAP WORK, AND COMMENT <Map /> */}
                <Map latitude={parseFloat(lastKnownValues?.Latitude)} longitude={parseFloat(lastKnownValues?.Longitude)} />
                {/* <Map /> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </PerfectScrollbar>
    </>
  );
};

export default CircularGaugeComp;


{/* <div className="row border border-dark nav p-3 me-1">
                <div className="row">
                  <div className="col-md-12"><span className="badge boat-dashboard-heading-bg boat-dashboard-heading-text">Engine RPM</span></div>
                </div>

                <div className="row">
                  <div className="d-flex justify-content-center mb-5 mt-3">
                    <GaugeComponent
                      className="mt-5"
                      id="gauge-component-radial2"
                      value={parseFloat(lastKnownValues.Speed)}
                      type="semicircle"
                      labels={{
                        tickLabels: {
                          ticks: [
                            { value: 20 },
                            { value: 50 },
                            { value: 80 },
                            { value: 100 }
                          ]
                        }
                      }}
                      arc={{
                        colorArray: ['#fc0d0d', '#ffdede'],
                        nbSubArcs: 90,
                        padding: 0.01,
                        width: 0.3
                      }}
                      pointer={{ animationDelay: 0 }}
                    />
                  </div>
                </div>
              </div> */}

{/* <div className="row border border-dark nav mt-2 me-1">
                <div className="col-md-12 p-3">
                  <div className="row">
                    <div className="col-md-12">
                      <span className="badge boat-dashboard-heading-bg boat-dashboard-heading-text">Fuel</span>
                    </div>

                    <div className="row">
                      <div className="d-flex justify-content-start ms-5 mt-3" style={{ height: "280px" }}>
                        <VerticalGauge percentage={fuelValue} />

                        <div className="d-flex justify-content-center flex-column ms-5">
                          <div className="d-flex flex-column mb-1">
                            <p className="mb-0 boat-dashboard-heading-text">Fuel Remaining</p>
                            <p className="h5">0.09L/hr</p>
                          </div>
                          <div className="d-flex flex-column mb-1">
                            <p className="mb-0 boat-dashboard-heading-text">Litre Hour</p>
                            <p className="h5">6 L</p>
                          </div>
                          <div className="d-flex flex-column mb-1">
                            <p className="mb-0 boat-dashboard-heading-text">Range</p>
                            <p className="h5">126 km</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

