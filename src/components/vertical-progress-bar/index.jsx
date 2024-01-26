const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    barContainer: {
        width: "20px",
        height: "180px",
        backgroundColor: "#2e2e2e",
        // borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        margin: "0 10px"
    },
    fill: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    rulerContainer: {
        height: '180px',
        paddingLeft: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    rulerItem: {
        color: 'white',
    }
};

const VerticalProgressBar = ({ fillPercentage, fillColor, axis, desc, showRuler = false }) => {
    const rulerValues = ['3', '2', '1', '0', '-1', '-2', '-3'];

    return (
        <div style={styles.container}>
            <p className={`d-flex justify-content-center ${showRuler && "me-4"}`}>3m</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={styles.barContainer}>
                    <div
                        style={{
                            ...styles.fill,
                            height: `${fillPercentage}%`,
                            backgroundColor: fillColor
                        }}
                    />
                </div>
                {showRuler && (
                    <div style={styles.rulerContainer}>
                        {rulerValues.map((val, idx) => (
                            <span key={idx} style={styles.rulerItem}>{val}</span>
                        ))}
                    </div>
                )}
            </div>
            
            <p className={`d-flex justify-content-center mb-0 ${showRuler && "me-4"}`}>{axis}</p>
            <p className={`d-flex justify-content-center text-muted fw-bolder ${showRuler && "me-3"}`}>{desc}</p>
        </div>
    );
};

export default VerticalProgressBar;
