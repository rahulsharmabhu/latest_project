import React, { useState, useRef } from "react";
import "./slidernew.css";

const SliderNew = ({ rulerState }) => {
  const [currentPercentageState, setCurrentPercentageState] = useState(0);
  const easing = "cubic-bezier(0.5, 1, 0.89, 1)";
  const duration = 1000;

  const easeReversal = (y) => 1 - Math.sqrt((y - 1) / -1);

  const animate = (percentage) => {
    percentage = parseFloat(percentage);

    const threshold = currentPercentageState / percentage < 0;
    console.log("Crosses 0: " + threshold);

    if (!threshold && percentage !== 0) {
      const blind = percentage < 0 ? "left" : "right";
      const blindElement = document.querySelector(`.blind.${blind}`);

      blindElement.animate(
        [
          {
            transform: `translateX(${currentPercentageState}%)`,
            easing: easing,
          },
          {
            transform: `translateX(${percentage}%)`,
          },
        ],
        {
          fill: "forwards",
          duration: duration,
        }
      );
    } else {
      const firstBlind = percentage < 0 ? "right" : "left";
      const secondBlind = percentage < 0 ? "left" : "right";
      const delta = currentPercentageState - percentage;
      const firstTravel = currentPercentageState / delta;
      const secondTravel = 1 - firstTravel;

      console.log("delta; total values to travel: ", delta);
      console.log(
        "firstTravel; percentage of the total travel that should be done by the first blind: ",
        firstTravel
      );
      console.log(
        "secondTravel; percentage of the total travel that should be done by the second blind: ",
        secondTravel
      );

      const firstBlindElement = document.querySelector(`.blind.${firstBlind}`);
      const secondBlindElement = document.querySelector(
        `.blind.${secondBlind}`
      );

      firstBlindElement.animate(
        [
          {
            transform: `translateX(${currentPercentageState}%)`,
            easing: easing,
          },
          {
            transform: `translateX(${percentage}%)`,
          },
        ],
        {
          fill: "forwards",
          duration: duration,
          iterations: easeReversal(firstTravel),
        }
      );

      secondBlindElement.animate(
        [
          {
            transform: `translateX(${currentPercentageState}%)`,
            easing: easing,
          },
          {
            transform: `translateX(${percentage}%)`,
          },
        ],
        {
          fill: "forwards",
          duration: duration,
          iterationStart: easeReversal(firstTravel),
          iterations: 1 - easeReversal(firstTravel),
          delay: duration * easeReversal(firstTravel),
        }
      );
    }
    setCurrentPercentageState(percentage);
  };

  const amountInputRef = useRef(null);

  // useEffect(() => {
  //   const rulerContainer = document.querySelector(".ruler-container");

  //   // Check if the ruler already exists before creating a new one
  //   if (!rulerContainer.querySelector(".ruler")) {
  //     const ruler = document.createElement("ul");
  //     ruler.className = "ruler";
  //     ruler.setAttribute("data-items", "21");

  //     for (let i = -10; i <= 10; i++) {
  //       const item = document.createElement("li");
  //       item.textContent = i;
  //       ruler.appendChild(item);
  //     }

  //     rulerContainer.appendChild(ruler);
  //   }
  // }, []);
  const numbers = Array.from({ length: 21 }, (_, i) => i - 10);

  // const handleMouseDown = (e) => {
  //   e.preventDefault();
  //   setIsDragging(true);
  // };

  // const handleMouseMove = (e) => {
  //   if (isDragging) {
  //     const containerRect = containerRef.current.getBoundingClientRect();
  //     const containerWidth = containerRect.width;
  //     const offsetX = e.clientX - containerRect.left;
  //     const newPercentage = (offsetX / containerWidth) * 100;

  //     if (newPercentage >= 0 && newPercentage <= 100) {
  //       setCurrentPercentageState(newPercentage);
  //       blindRef.current.style.left = `${newPercentage}%`;
  //     }
  //   }
  // };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  // };

  // const wrapperStyle = {
  //   margin: "10px auto 2px",
  //   height: "20px",
  //   width: "260px",
  //   border: "1px solid black",
  //   boxSizing: "border-box",
  //   position: "relative",
  //   overflow: "hidden",
  //   cursor: isDragging ? "grabbing" : "grab",
  // };

  return (
    <div className="">
      <div style={{ transform: "rotate(270deg)" }}>
        <div
          className="wrapper"
          style={{ marginTop: "11rem" }}
          // onMouseDown={handleMouseDown}
          // onMouseMove={handleMouseMove}
          // onMouseUp={handleMouseUp}
          // ref={containerRef}
          // style={wrapperStyle}
        >
          <div className="blind right"></div>
          <div className="blind left"></div>
        </div>

        {rulerState && (
          <div className="ruler">
            {numbers.map((number) => (
              <div key={number} className="ruler-item">
                <div
                  className="scale-line"
                  style={{ transform: "rotate(90deg)" }}
                >
                 <p className="mb-0"> - </p>
                </div>
                <div style={{ transform: "rotate(90deg)" }}>
                  <p className="small-text">
                    {number === 0 ? "0" : Math.abs(number) + " "}{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <div className="ruler-container pt-5" style={{ transform: "rotate(270deg)", width: "240px" }}>
      </div> */}

      {/* <div className="mt-5 pt-5 pl-5"> */}
      {/* <input
          ref={amountInputRef}
          type="number"
          placeholder="Enter percentage..."
          defaultValue="0"
          className="mt-5"
          style={{
            backgroundColor: "white", // Add a background color
            color: "black", // Change text color
            marginLeft: 32,
            marginTop: 20,
          }}
        /> */}

      {/* <input
          ref={amountInputRef}
          type="number"
          placeholder="Enter percentage..."
          defaultValue="-80"
          className="mt-5"
          style={{
            backgroundColor: "white", // Add a background color
            color: "black", // Change text color
            marginLeft: 32,
            marginTop: 20
          }}
        /> */}
      {/* <button
          className="apply mt-5"
          style={{ marginLeft: "50px" }}
          onClick={() => animate(amountInputRef.current.value)}
        >
          Apply
        </button> */}
      {/* <button className="reset mt-5" onClick={() => animate(0)}>
          Reset
        </button> */}
      {/* </div> */}
    </div>
  );
};

export default SliderNew;
