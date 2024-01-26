import React from 'react'
import { useEffect, useState } from 'react';


const TrimSvg = ({ degrees }) => {
    const [rotation, setRotation] = useState(0);
    const [direction, setDirection] = useState(1); // Start by increasing by 1

    useEffect(() => {
        if (degrees !== NaN) {
            const rotateInterval = setInterval(() => {
                // Increment/Decrement by 5 degrees every 100ms
                if ((rotation === degrees && direction === 1) || (rotation === -degrees && direction === -1)) {
                    setDirection(-direction); // Change direction
                }

                setRotation(prevRotation => prevRotation + direction);
            }, 70);

            return () => clearInterval(rotateInterval); // Clean up the interval on component unmount
        }

    }, [rotation, direction]);

    // useEffect(() => {
    //     if(degrees){
    //         setRotation(degrees)
    //     }

    // },[degrees])

    const rotationStyle = {
        // transform: `rotate(${rotation}deg)`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: '50% 50%' // Ensuring it rotates from the center
    };


    return (
        <>
            <div className='d-flex justify-content-center mb-4'>
                <svg width="216" height="230" viewBox="0 0 216 264" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g style={rotationStyle}>
                        {/* <path d="M108.704 14.14C107.929 14.14 107.229 13.944 106.604 13.552C105.988 13.16 105.503 12.5907 105.148 11.844C104.793 11.088 104.616 10.1733 104.616 9.1C104.616 8.02667 104.793 7.11667 105.148 6.37C105.503 5.614 105.988 5.04 106.604 4.648C107.229 4.256 107.929 4.06 108.704 4.06C109.488 4.06 110.188 4.256 110.804 4.648C111.42 5.04 111.905 5.614 112.26 6.37C112.624 7.11667 112.806 8.02667 112.806 9.1C112.806 10.1733 112.624 11.088 112.26 11.844C111.905 12.5907 111.42 13.16 110.804 13.552C110.188 13.944 109.488 14.14 108.704 14.14ZM108.704 12.558C109.161 12.558 109.558 12.4367 109.894 12.194C110.23 11.942 110.491 11.5593 110.678 11.046C110.874 10.5327 110.972 9.884 110.972 9.1C110.972 8.30667 110.874 7.658 110.678 7.154C110.491 6.64067 110.23 6.26267 109.894 6.02C109.558 5.768 109.161 5.642 108.704 5.642C108.265 5.642 107.873 5.768 107.528 6.02C107.192 6.26267 106.926 6.64067 106.73 7.154C106.543 7.658 106.45 8.30667 106.45 9.1C106.45 9.884 106.543 10.5327 106.73 11.046C106.926 11.5593 107.192 11.942 107.528 12.194C107.873 12.4367 108.265 12.558 108.704 12.558Z" fill="#EDEDED" /> */}
                        <rect x="62.7878" y="58" width="157" height="157" transform="rotate(20.1167 62.7878 58)" fill="url(#pattern0)" />
                        <line x1="1.39407" y1="240.204" x2="215.394" y2="77.2045" stroke="#33B404" stroke-width="2" stroke-dasharray="4 4" />

                        {/* <path d="M154.469 46.3761L160.653 39.7001L160.677 40.8483L158.571 38.898L159.608 37.7785L162.463 40.4233L155.804 47.6129L154.469 46.3761ZM159.518 51.2438C159.011 50.7745 158.581 50.2428 158.228 49.6487C157.889 49.0541 157.675 48.4744 157.587 47.9098L159.113 47.3957C159.177 47.849 159.333 48.3119 159.582 48.7845C159.838 49.2634 160.168 49.69 160.572 50.0642C161.045 50.5018 161.506 50.745 161.957 50.7938C162.415 50.849 162.8 50.7088 163.11 50.3733C163.32 50.1473 163.445 49.8948 163.488 49.6158C163.537 49.3432 163.458 49.0291 163.253 48.6737C163.055 48.3247 162.709 47.9218 162.216 47.4652L160.481 45.8574L164.475 42.2867L168.696 46.1968L167.659 47.3163L163.931 43.8628L165.219 43.873L162.231 46.5433L162.113 45.2698L163.561 46.6113C164.273 47.2709 164.756 47.8963 165.01 48.4876C165.277 49.0784 165.354 49.6335 165.242 50.153C165.143 50.6719 164.897 51.1437 164.503 51.5682C164.117 51.9859 163.659 52.2742 163.13 52.4331C162.601 52.5921 162.026 52.581 161.405 52.4001C160.79 52.2254 160.161 51.84 159.518 51.2438Z" fill="#EDEDED" /> */}
                        {/* <path d="M127 39L129.989 50.1536L138.154 41.9886L127 39ZM180 92L177.011 80.8464L168.846 89.0114L180 92ZM132.657 46.0711L172.929 86.3431L174.343 84.9289L134.071 44.6569L132.657 46.0711Z" fill="white" /> */}
                    </g>
                    <line x1="109" y1="264" x2="109" y2="32" stroke="#FF0000" stroke-width="2" />
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_9419_11915" transform="scale(0.00195312)" />
                        </pattern>
                        <image id="image0_9419_11915" width="512" height="512" xlinkHref="data:image/png;base64,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" />
                    </defs>
                </svg>


            </div>
            {/* </PerfectScrollbar> */}
        </>
    )
}

export default TrimSvg