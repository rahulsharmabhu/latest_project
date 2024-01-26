import React, { useEffect, useRef, useState } from "react";
import { useOnVideoClickState } from "../../../app-redux/hooks/useOnVideoClickState";
import { useOnAngleClickState } from "../../../app-redux/hooks/useOnAngleClickState";
import PerfectScrollbar from "react-perfect-scrollbar";
import Slider from "../../../components/slider";
import Toast from "../../../components/toast";

const colors = {
  cyan: "#242525",
  darkBlue: "#4B4E8A",
  white: "#fff",
  gray: "#666",
  black: "#000",
  outerLinesGray: "#b3b3b3",
  innerCircleGray: "#B3B3B380",
};

const CompassSvg = ({isShow}) => {
  const { videoState } = useOnVideoClickState();
  const { angleState, setAngleClickState } = useOnAngleClickState();
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isAngleUpdated, setIsAngleUpdated] = useState(null);
  const [activeArrow, setActiveArrow] = useState(null);
  const [slider, setSlider] = useState(0);

  const prevSvgClass = useRef(null);

  const maxValue = 2;
  const minValue = 0;
  const steps = 0.2;
  const unit = "Hz";

  useEffect(() => {
    setAngleClickState({ ...angleState, waveFrequency: slider });
    if (angleState?.isReplaying) {
      handleClick(angleState?.angle, false);
    }
  }, [angleState?.angle, slider]);


  const handleHover = (e, angle) => {
    const classname = ".angle-" + angle;
    const triangle = document.querySelector(classname);
    if (triangle) {
      triangle.style.setProperty("fill", colors.darkBlue, "important");
    }
  };

  const handleClick = (value, blockHover = true) => {
    if (angleState?.isReplaying && blockHover) {
      Toast("Please turn off replaying mode by removing file.!", "error");
      return;
    }
    const classname = ".angle-" + value;

    const triangle = document.querySelector(classname);

    if (
      videoState &&
      videoState?.isPlay !== undefined &&
      videoState?.isPlay !== true &&
      value !== isAngleUpdated
    ) {
      setIsAngleUpdated(value);
      setAngleClickState({
        ...angleState,
        angle: value,
        waveFrequency: slider,
      });
      if (triangle) {
        const isClassExist = triangle?.classList.contains("active-angle");

        if (!isClassExist) {
          const elements = document.querySelectorAll(".active-angle");
          elements.forEach((element) => {
            element?.classList.remove("active-angle");
          });
          triangle?.classList.add("active-angle");
        }
      }
    } else {
      setIsAngleUpdated(null);
      setAngleClickState({ ...angleState, angle: null });

      if (triangle) {
        const isClassExist = triangle?.classList.contains("active-angle");

        if (isClassExist) {
          triangle?.classList.remove("active-angle");
          setAngleClickState(null);
        }
      }
    }
  };

  useEffect(() => {
    if (videoState?.name) {
      var elements = document.getElementsByClassName("active-angle");
      var elementsArray = Array.from(elements);
      elementsArray.forEach(function (element) {
        element?.classList.remove("active-angle");
      });
    }
  }, [videoState]);

  // DON'T REMOVE COMMENTED USEEFFECTS

  // useEffect(() => {
  //   const svg = document.getElementById('theme-iframe');
  //   if (svg) {
  //     if (svg?.classList.contains('dark')) {
  //       setIsDarkTheme(true);
  //     } else if (svg?.classList.contains('light')) {
  //       setIsDarkTheme(false);
  //     } else {
  //       setIsDarkTheme(true);
  //       svg?.classList.add('dark')
  //     }
  //   }
  // }, [isDarkTheme]);

  // useEffect(() => {
  //   const svg = document.getElementById("theme-iframe");
  //   if (svg) {
  //     const currentSvgClass = svg?.classList.contains("dark") ? "dark" : "light ";
  //     if (prevSvgClass.current !== currentSvgClass) {
  //       setIsDarkTheme(currentSvgClass === "dark");
  //       prevSvgClass.current = currentSvgClass;
  //     }
  //   }
  // }, [prevSvgClass]);

  useEffect(() => {
    const svg = document.getElementById("theme-iframe");
    if (localStorage.getItem("theme") === "dark") {
      svg?.classList.add("dark");
    } else {
      svg?.classList.add("light");
    }
  }, []);

  return (
    <>
      <PerfectScrollbar>
        <div className="d-flex justify-content-center">
          <svg
            id="theme-iframe"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            height="100%"
            width="100%"
            viewBox="0.7 3.09 78.84 73.7"
            style={{
              // background: isDarkTheme ? colors.cyan : colors.white,
              maxWidth: "300px",
            }}
          >
            {/* angle 180 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.gray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M41.062 39.51l7.174-33.04-13.19-.23z"
                stopColor={colors.black}
                style={{ transition: "fill 0.1s", zIndex: "1000" }}
                onClick={() => handleClick(180)}
                onMouseOver={(e) => handleHover(e, 180)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-180");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
                className="angle-180"
              ></path>
            </g>
            {/* angle 158 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.outerLinesGray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M60.396 11.744L48.3 6.484l-7.174 33.04z"
                stopColor={colors.black}
                className="angle-158"
                style={{ stroke: colors.gray, transition: "fill 0.1s" }}
                onMouseOver={(e) => handleHover(e, 158)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-158");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              ></path>
            </g>
            {/* angle 135 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.outerLinesGray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M60.396 11.744l-19.27 27.78 28.434-18.29z"
                stopColor={colors.black}
                className="angle-135"
                style={{ stroke: colors.gray, transition: "fill 0.1s" }}
                onMouseOver={(e) => handleHover(e, 135)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-135");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              ></path>
            </g>
            {/* angle 113 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.outerLinesGray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M69.56 21.234l-28.435 18.29 33.27-6.017z"
                stopColor={colors.black}
                className="angle-113"
                style={{ stroke: colors.gray, transition: "fill 0.1s" }}
                onMouseOver={(e) => handleHover(e, 113)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-113");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              // onMouseOver={(e) => {
              //   e.target.style.fill = colors.darkBlue;
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.fill = isDarkTheme
              //     ? colors.cyan
              //     : colors.white;
              // }}
              ></path>
            </g>
            {/* angle 90 */}
            <g display="inline">
              <path
                id="triangle-90"
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.gray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                onClick={() => handleClick(90)}
                d="M74.395 33.507l-33.27 6.016 33.04 7.174z"
                stopColor={colors.black}
                className="angle-90"
                style={{ transition: "fill 0.1s", zIndex: "1000" }}
                onMouseOver={(e) => handleHover(e, 90)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-90");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              // onMouseOver={(e) => {
              //   e.target.style.fill = colors.darkBlue;
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.fill = isDarkTheme
              //     ? colors.cyan
              //     : colors.white;
              // }}
              ></path>
            </g>
            {/* angle 67 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.outerLinesGray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M41.125 39.523l27.78 19.271 5.26-12.097z"
                stopColor={colors.black}
                className="angle-67"
                style={{ stroke: colors.gray, transition: "fill 0.1s" }}
                onMouseOver={(e) => handleHover(e, 67)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-67");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              // onMouseOver={(e) => {
              //   e.target.style.fill = colors.darkBlue;
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.fill = isDarkTheme
              //     ? colors.cyan
              //     : colors.white;
              // }}
              ></path>
            </g>
            {/* angle 45 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.outerLinesGray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M41.125 39.523l18.29 28.435 9.49-9.164z"
                stopColor={colors.black}
                className="angle-45"
                style={{ stroke: colors.gray, transition: "fill 0.1s" }}
                onMouseOver={(e) => handleHover(e, 45)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-45");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              // onMouseOver={(e) => {
              //   e.target.style.fill = colors.darkBlue;
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.fill = isDarkTheme
              //     ? colors.cyan
              //     : colors.white;
              // }}
              ></path>
            </g>
            {/* angle 22 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.outerLinesGray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M41.125 39.523l6.016 33.27 12.274-4.835z"
                stopColor={colors.black}
                className="angle-22"
                style={{ stroke: colors.gray, transition: "fill 0.1s" }}
                onMouseOver={(e) => handleHover(e, 22)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-22");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              // onMouseOver={(e) => {
              //   e.target.style.fill = colors.darkBlue;
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.fill = isDarkTheme
              //     ? colors.cyan
              //     : colors.white;
              // }}
              ></path>
            </g>

            {/* angle 0 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.gray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M41.125 39.523l-7.173 33.04 13.19.23z"
                className="angle-0"
                stopColor={colors.black}
                style={{ transition: "fill 0.1s", zIndex: "1000" }}
                onClick={() => handleClick(0)}
                onMouseOver={(e) => handleHover(e, 0)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-0");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              // onMouseOver={(e) => {
              //   e.target.style.fill = colors.darkBlue;
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.fill = isDarkTheme
              //     ? colors.cyan
              //     : colors.white;
              // }}
              ></path>
            </g>
            {/* angle 338 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.outerLinesGray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M21.791 67.289l12.098 5.26 7.173-33.04z"
                stopColor={colors.black}
                className="angle-338"
                style={{ stroke: colors.gray, transition: "fill 0.1s" }}
                onMouseOver={(e) => handleHover(e, 338)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-338");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              // onMouseOver={(e) => {
              //   e.target.style.fill = colors.darkBlue;
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.fill = isDarkTheme
              //     ? colors.cyan
              //     : colors.white;
              // }}
              ></path>
            </g>
            {/* angle 315 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.outerLinesGray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M21.791 67.289l19.271-27.78L12.628 57.8z"
                stopColor={colors.black}
                className="angle-315"
                style={{ stroke: colors.gray, transition: "fill 0.1s" }}
                onMouseOver={(e) => handleHover(e, 315)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-315");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              // onMouseOver={(e) => {
              //   e.target.style.fill = colors.darkBlue;
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.fill = isDarkTheme
              //     ? colors.cyan
              //     : colors.white;
              // }}
              ></path>
            </g>
            {/* angle 293 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.outerLinesGray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M12.628 57.8l28.434-18.29-33.27 6.016z"
                stopColor={colors.black}
                className="angle-293"
                style={{ stroke: colors.gray, transition: "fill 0.1s" }}
                onMouseOver={(e) => handleHover(e, 293)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-293");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              // onMouseOver={(e) => {
              //   e.target.style.fill = colors.darkBlue;
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.fill = isDarkTheme
              //     ? colors.cyan
              //     : colors.white;
              // }}
              ></path>
            </g>
            {/* angle 270 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.gray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M7.793 45.526l33.27-6.016-33.04-7.174z"
                stopColor={colors.black}
                className="angle-270"
                onClick={() => handleClick(270)}
                style={{ transition: "fill 0.1s", zIndex: "1000" }}
                onMouseOver={(e) => handleHover(e, 270)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-270");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              //  onMouseOver={(e) => {
              //     e.target.style.fill = colors.darkBlue;
              //   }}
              //   onMouseOut={(e) => {
              //     e.target.style.fill = isDarkTheme
              //       ? colors.cyan
              //       : colors.white;
              //   }}
              ></path>
            </g>
            {/* angle 248 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.outerLinesGray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M41.062 39.51L13.283 20.239l-5.26 12.097z"
                stopColor={colors.black}
                className="angle-248"
                style={{ stroke: colors.gray, transition: "fill 0.1s" }}
                onMouseOver={(e) => handleHover(e, 248)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-248");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              // onMouseOver={(e) => {
              //   e.target.style.fill = colors.darkBlue;
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.fill = isDarkTheme
              //     ? colors.cyan
              //     : colors.white;
              // }}
              ></path>
            </g>
            {/* angle 225 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.outerLinesGray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M41.062 39.51l-18.29-28.435-9.489 9.164z"
                stopColor={colors.black}
                className="angle-225"
                style={{ stroke: colors.gray, transition: "fill 0.1s" }}
                onMouseOver={(e) => handleHover(e, 225)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-225");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              // onMouseOver={(e) => {
              //   e.target.style.fill = colors.darkBlue;
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.fill = isDarkTheme
              //     ? colors.cyan
              //     : colors.white;
              // }}
              ></path>
            </g>
            {/* angle 203 */}
            <g display="inline">
              <path
                fill={isDarkTheme ? colors.cyan : colors.white}
                stroke={colors.outerLinesGray}
                strokeDasharray="none"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.051"
                d="M41.062 39.51L35.046 6.24l-12.273 4.835z"
                stopColor={colors.black}
                className="angle-203"
                style={{ stroke: colors.gray, transition: "fill 0.1s" }}
                onMouseOver={(e) => handleHover(e, 203)}
                onMouseOut={() => {
                  const angle0 = document.querySelector(".angle-203");
                  angle0.style.fill = isDarkTheme ? colors.cyan : colors.white;
                }}
              // onMouseOver={(e) => {
              //   e.target.style.fill = colors.darkBlue;
              // }}
              // onMouseOut={(e) => {
              //   e.target.style.fill = isDarkTheme
              //     ? colors.cyan
              //     : colors.white;
              // }}
              ></path>
            </g>
            <g id="primary">
              <text
                xmlSpace="preserve"
                style={{ lineHeight: "1.25" }}
                x="75.571"
                y="40.349"
                fill={colors.black}
                fillOpacity="1"
                stroke="none"
                strokeWidth="0.142"
                display="inline"
                fontFamily="sans-serif"
                fontSize="2.822"
                fontStyle="normal"
                fontWeight="normal"
              >
                <tspan
                  x="75.571"
                  y="40.349"
                  // fill={isDarkTheme ? colors.white : colors.black}
                  strokeWidth="0.142"
                  fontSize="2.822"
                >
                  90
                </tspan>
              </text>
              <text
                xmlSpace="preserve"
                style={{ lineHeight: "1.25" }}
                x="40.333"
                y="75.988"
                fill={colors.black}
                fillOpacity="1"
                stroke="none"
                strokeWidth="0.142"
                display="inline"
                fontFamily="sans-serif"
                fontSize="2.822"
                fontStyle="normal"
                fontWeight="normal"
              >
                <tspan
                  x="40.333"
                  y="75.988"
                  // fill={isDarkTheme ? colors.white : colors.black}
                  strokeWidth="0.142"
                  fontSize="2.822"
                >
                  0
                </tspan>
              </text>
              <text
                xmlSpace="preserve"
                style={{ lineHeight: "1.25" }}
                x="38.076"
                y="5.486"
                fill={colors.black}
                fillOpacity="1"
                stroke="none"
                strokeWidth="0.142"
                display="inline"
                fontFamily="sans-serif"
                fontSize="2.822"
                fontStyle="normal"
                fontWeight="normal"
              >
                <tspan
                  x="38.076"
                  y="5.486"
                  // fill={isDarkTheme ? colors.white : colors.black}
                  strokeWidth="0.142"
                  fontSize="2.822"
                >
                  180
                </tspan>
              </text>
              <text
                xmlSpace="preserve"
                style={{ lineHeight: "1.25" }}
                x="1.502"
                y="40.301"
                fill={colors.black}
                fillOpacity="1"
                stroke="none"
                strokeWidth="0.142"
                display="inline"
                fontFamily="sans-serif"
                fontSize="2.822"
                fontStyle="normal"
                fontWeight="normal"
              >
                <tspan
                  x="1.502"
                  y="40.301"
                  // fill={isDarkTheme ? colors.white : colors.black}
                  strokeWidth="0.142"
                  fontSize="2.822"
                >
                  270
                </tspan>
              </text>
              <circle
                cx="41.281"
                cy="39.471"
                r="30.089"
                fill="none"
                stroke={colors.innerCircleGray}
                strokeDasharray="0.8, 0.8"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.1"
                display="inline"
                stopColor={colors.black}
              ></circle>
              <circle
                cx="41.281"
                cy="39.471"
                r="26.883"
                fill="none"
                stroke={colors.innerCircleGray}
                strokeDasharray="0.8, 0.8"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.1"
                display="inline"
                stopColor={colors.black}
              ></circle>
              <g
                fill={isDarkTheme ? "#0083FF" : "#0083FF"}
                stroke={colors.gray}
                strokeDasharray="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="4"
                strokeWidth="0.3"
                display="inline"
                transform="translate(-57.968 -93.338)"
              >
                <g id="primary" transform="translate(.001)">
                  <path
                    d="M100.44 165.12v-7.089h.9l-2.09-1.978-2.092 1.978h.9v7.088z"
                    stopColor={colors.black}
                    onClick={() => handleClick(0)}
                    onMouseOver={(e) => handleHover(e, 0)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-0");
                      if (angle0 && angle0 !== activeArrow) {
                        angle0.style.fill = isDarkTheme
                          ? colors.cyan
                          : colors.white;
                      }
                    }}
                  // onClick={(e) => handleArrowClick(e, 0)}
                  ></path>
                  <path
                    d="M98.059 100.499v7.088h-.9l2.09 1.978 2.091-1.978h-.9v-7.088z"
                    stopColor={colors.black}
                    onClick={() => handleClick(180)}
                    onMouseOver={(e) => handleHover(e, 180)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-180");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                </g>
                <g id="primary" transform="rotate(90 99.25 132.81)">
                  <path
                    d="M100.44 165.12v-7.089h.9l-2.09-1.978-2.092 1.978h.9v7.088z"
                    stopColor={colors.black}
                    onClick={() => handleClick(270)}
                    onMouseOver={(e) => handleHover(e, 270)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-270");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                  <path
                    d="M98.059 100.499v7.088h-.9l2.09 1.978 2.091-1.978h-.9v-7.088z"
                    stopColor={colors.black}
                    onClick={() => handleClick(90)}
                    onMouseOver={(e) => handleHover(e, 90)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-90");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                </g>
              </g>
              <g
                fill={isDarkTheme ? "#024A8F" : "#024A8F"}
                stroke={colors.gray}
                strokeDasharray="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="4"
                strokeWidth="0.1"
                display="inline"
                transform="rotate(135 89.597 74.134)"
              >
                <g id="primary" transform="translate(.001)">
                  <path
                    d="M100.44 165.12v-7.089h.9l-2.09-1.978-2.092 1.978h.9v7.088z"
                    stopColor={colors.black}
                    onMouseOver={(e) => handleHover(e, 225)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-225");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                  <path
                    d="M98.059 100.499v7.088h-.9l2.09 1.978 2.091-1.978h-.9v-7.088z"
                    stopColor={colors.black}
                    onMouseOver={(e) => handleHover(e, 45)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-45");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                </g>
                <g id="primary" transform="rotate(90 99.25 132.81)">
                  <path
                    d="M100.44 165.12v-7.089h.9l-2.09-1.978-2.092 1.978h.9v7.088z"
                    stopColor={colors.black}
                    onMouseOver={(e) => handleHover(e, 135)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-135");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                  <path
                    d="M98.059 100.499v7.088h-.9l2.09 1.978 2.091-1.978h-.9v-7.088z"
                    stopColor={colors.black}
                    onMouseOver={(e) => handleHover(e, 315)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-315");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                </g>
              </g>
              <g
                fill={isDarkTheme ? "#666666" : "#666666"}
                stroke={colors.gray}
                strokeDasharray="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="4"
                strokeWidth="0.1"
                display="inline"
                transform="rotate(157.5 79.55 80.375)"
              >
                <g id="primary" transform="translate(.001)">
                  <path
                    d="M100.44 165.12v-7.089h.9l-2.09-1.978-2.092 1.978h.9v7.088z"
                    stopColor={colors.black}
                    onMouseOver={(e) => handleHover(e, 203)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-203");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                  <path
                    d="M98.059 100.499v7.088h-.9l2.09 1.978 2.091-1.978h-.9v-7.088z"
                    stopColor={colors.black}
                    onMouseOver={(e) => handleHover(e, 22)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-22");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                </g>
                <g id="primary" transform="rotate(90 99.25 132.81)">
                  <path
                    d="M100.44 165.12v-7.089h.9l-2.09-1.978-2.092 1.978h.9v7.088z"
                    stopColor={colors.black}
                    onMouseOver={(e) => handleHover(e, 113)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-113");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                  <path
                    d="M98.059 100.499v7.088h-.9l2.09 1.978 2.091-1.978h-.9v-7.088z"
                    stopColor={colors.black}
                    onMouseOver={(e) => handleHover(e, 293)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-293");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                </g>
              </g>
              <g
                fill={isDarkTheme ? "#666666" : "#666666"}
                stroke={colors.gray}
                strokeDasharray="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="4"
                strokeWidth="0.1"
                display="inline"
                transform="rotate(112.5 101.45 66.773)"
              >
                <g id="primary" transform="translate(.001)">
                  <path
                    d="M100.44 165.12v-7.089h.9l-2.09-1.978-2.092 1.978h.9v7.088z"
                    stopColor={colors.black}
                    onMouseOver={(e) => handleHover(e, 248)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-248");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                  <path
                    d="M98.059 100.499v7.088h-.9l2.09 1.978 2.091-1.978h-.9v-7.088z"
                    stopColor={colors.black}
                    onMouseOver={(e) => handleHover(e, 67)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-67");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                </g>
                <g id="primary" transform="rotate(90 99.25 132.81)">
                  <path
                    d="M100.44 165.12v-7.089h.9l-2.09-1.978-2.092 1.978h.9v7.088z"
                    stopColor={colors.black}
                    onMouseOver={(e) => handleHover(e, 158)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-158");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                  <path
                    d="M98.059 100.499v7.088h-.9l2.09 1.978 2.091-1.978h-.9v-7.088z"
                    stopColor={colors.black}
                    onMouseOver={(e) => handleHover(e, 338)}
                    onMouseOut={() => {
                      const angle0 = document.querySelector(".angle-338");
                      angle0.style.fill = isDarkTheme
                        ? colors.cyan
                        : colors.white;
                    }}
                  ></path>
                </g>
              </g>
              <circle
                cx="41.281"
                cy="39.471"
                r="23.239"
                fill="none"
                stroke={colors.innerCircleGray}
                strokeDasharray="0.8, 0.8"
                strokeDashoffset="0"
                strokeMiterlimit="4"
                strokeWidth="0.1"
                display="inline"
                stopColor={colors.black}
              ></circle>
              <path
                id="primary"
                fill={colors.white}
                fillOpacity="1"
                stroke={colors.black}
                strokeDasharray="none"
                strokeMiterlimit="4"
                strokeWidth="0.2"
                d="M41.281 23.441c-1.328 1.423-2.372 3.94-2.526 6.796-.108 5.436 0 25.124 0 25.124.092 1.52 1.517 1.737 2.526 1.678 1.008.059 2.434-.158 2.526-1.678 0 0 .108-19.688 0-25.124-.154-2.856-1.198-5.373-2.526-6.796z"
                display="inline"
                stopColor={colors.black}
              ></path>
            </g>
          </svg>
        </div>
        
        {/* <StopWatch /> */}

        {
          isShow && (
            <>
            <hr></hr>
            <Slider
            value={slider}
            setValue={setSlider}
            maxSliderValue={maxValue}
            minSliderValue={minValue}
            numSteps={steps}
            unit={unit}
          />
            </>
            
          )
        }

       
      </PerfectScrollbar>
    </>
  );
};

export default CompassSvg;
