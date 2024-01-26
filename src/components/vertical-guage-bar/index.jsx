import React from "react";

const segmentColors = [
    "red", "red", "orange", "orange", "yellow", "yellow", "lime", "lime", "green", "green"
];

const styles = {
    container: {
        width: "100px",
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        position: "relative"
    },
    segment: {
        width: "70%",
        height: "35%",
        marginBottom: "10px",
        borderRadius: "5px"
    },
    label: {
        position: "absolute",
        left: "-40px"
    }
};

const VerticalGauge = ({ percentage }) => {
    const segmentsToShow = Math.round((percentage / 10) * 10);
    return (
        <div style={styles.container}>
            {[...Array(10).keys()].map((index) => (
                <div
                    key={index}
                    style={{
                        ...styles.segment,
                        backgroundColor: index < segmentsToShow ? segmentColors[index] : "grey"
                    }}
                />
            ))}
            {/* <div style={styles.label}>{percentage}</div> */}
        </div>
    );
};

export default VerticalGauge;