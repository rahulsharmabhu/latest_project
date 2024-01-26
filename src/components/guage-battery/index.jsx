import React from "react";

const GaugeBattery = ({ percentage }) => {

    // const rectFills = [
    //     "#FF0000", // for 10%
    //     "url(#paint0_linear_9339_12542)", // for 20%
    //     "url(#paint1_linear_9339_12542)", // for 30%
    //     "url(#paint2_linear_9339_12542)", // for 40%
    //     "url(#paint3_linear_9339_12542)", // for 50%
    //     "#33B404", // for 60%
    //     "#33B404", // for 70%
    //     "#44D505", // a little brighter green for 80%
    //     "#44D505" // a little brighter green for 90%
    // ];
    const rectFills = [
        "#84e291", // for 10%
        "#84e291", // for 20%
        "#84e291", // for 30%
        "#84e291", // for 40%
        "#84e291", // for 50%
        "#84e291", // for 60%
        "#84e291", // for 70%
        "#84e291", // a little brighter green for 80%
        "#84e291" // a little brighter green for 90%
    ];

    // Calculate which rectangles should be filled based on the percentage
    const numFilled = Math.floor(percentage / 10);

    return (
        <div>
            <svg width="100%" height="100%" viewBox="0 0 385 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1_9339_12542" fill="white">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0C1.79086 0 0 1.79086 0 4V82C0 84.2091 1.79086 86 4 86H364C366.209 86 368 84.2091 368 82V58.6586C368.626 58.8797 369.299 59 370 59H379C382.314 59 385 56.3137 385 53V33C385 29.6863 382.314 27 379 27H370C369.299 27 368.626 27.1203 368 27.3414V4C368 1.79086 366.209 0 364 0H4Z" />
                </mask>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0C1.79086 0 0 1.79086 0 4V82C0 84.2091 1.79086 86 4 86H364C366.209 86 368 84.2091 368 82V58.6586C368.626 58.8797 369.299 59 370 59H379C382.314 59 385 56.3137 385 53V33C385 29.6863 382.314 27 379 27H370C369.299 27 368.626 27.1203 368 27.3414V4C368 1.79086 366.209 0 364 0H4Z" fill="#3D3E3F" />
                <path d="M368 58.6586L369.333 54.8872L364 53.0023V58.6586H368ZM368 27.3414H364V32.9977L369.333 31.1128L368 27.3414ZM4 4V4V-4C-0.41828 -4 -4 -0.418274 -4 4H4ZM4 82V4H-4V82H4ZM4 82H4H-4C-4 86.4183 -0.418281 90 4 90V82ZM364 82H4V90H364V82ZM364 82V90C368.418 90 372 86.4183 372 82H364ZM364 58.6586V82H372V58.6586H364ZM370 55C369.759 55 369.536 54.9591 369.333 54.8872L366.667 62.4299C367.715 62.8003 368.838 63 370 63V55ZM379 55H370V63H379V55ZM381 53C381 54.1046 380.105 55 379 55V63C384.523 63 389 58.5228 389 53H381ZM381 33V53H389V33H381ZM379 31C380.105 31 381 31.8954 381 33H389C389 27.4772 384.523 23 379 23V31ZM370 31H379V23H370V31ZM369.333 31.1128C369.536 31.0409 369.759 31 370 31V23C368.838 23 367.715 23.1997 366.667 23.5701L369.333 31.1128ZM364 4V27.3414H372V4H364ZM364 4H372C372 -0.418279 368.418 -4 364 -4V4ZM4 4H364V-4H4V4Z" fill="white" fill-opacity="0.06" mask="url(#path-1-inside-1_9339_12542)" />
                {rectFills.map((fill, index) => (
                    <rect
                        key={index}
                        x={16 + 38 * index}
                        y={15}
                        width={24}
                        height={59}
                        rx={index >= 5 ? 4 : 2}
                        fill={index < numFilled ? fill : "white"}
                        fillOpacity={index < numFilled ? "1" : "1"}
                    />
                ))}
                <defs>
                    <linearGradient id="paint0_linear_9339_12542" x1="66" y1="15" x2="66" y2="74" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#EA4C09" />
                        <stop offset="1" stop-color="#CA2400" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_9339_12542" x1="104" y1="15" x2="104" y2="74" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#EA8209" />
                        <stop offset="1" stop-color="#CA4900" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_9339_12542" x1="142" y1="15" x2="142" y2="74" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#EAD309" />
                        <stop offset="1" stop-color="#CA5500" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_9339_12542" x1="180" y1="15" x2="180" y2="74" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#A2EA09" />
                        <stop offset="1" stop-color="#AECA00" />
                    </linearGradient>
                </defs>
            </svg>

            
                {percentage ? (
                    <p className="h4">{percentage} %</p>
                ) : (
                    <p className="h4">N/A</p>
                )}
            
            <p className="text-secondary mb-5">8 Hours remaining</p>
        </div>
    );
};

export default GaugeBattery;