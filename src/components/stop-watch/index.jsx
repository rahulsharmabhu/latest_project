import React, { useState } from 'react'
import Vector1 from '../../assets/vectors/Vector1.png'
import Vector2 from '../../assets/vectors/Vector2.png'

const colors = {
    blue: '#2D2E2F',
    borderBlue: '#2E6FA1',
}

const StopWatch = () => {
    const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);

    let updatedMs = time.ms, updatedS = time.s, updatedM = time.m;

    const run = () => {
        if (updatedM === 60) {
            updatedS++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        if (updatedMs === 100) {
            updatedS++;
            updatedMs = 0;
        }
        updatedMs++;
        return setTime({ ms: updatedMs, s: updatedS, m: updatedM });
    };

    const start = () => {
        run();
        setStatus(1);
        setInterv(setInterval(run, 10));
    };

    const stop = () => {
        clearInterval(interv);
        setStatus(0);
    };

    const reset = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ ms: 0, s: 0, m: 0 })
    };



    return (

        <>
            <div className="d-flex gap-5 justify-content-center">
                <div className="d-flex gap-2">
                    <img src={Vector1} alt="" className="img-fluid" style={{ height: '20px' }} />
                    <p>waveHeight</p>
                </div>

                <div className="d-flex gap-2">
                    <img src={Vector2} alt="" className="img-fluid" style={{ height: '20px' }} />
                    <p>encounter</p>
                </div>

            </div>

            <div className="d-flex justify-content-center">
                <div
                    className="shadow-lg "
                    style={{
                        border: `5px solid ${colors.borderBlue}`,
                        borderRadius: '50%',
                        width: '200px',
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        backgroundColor: colors.blue,
                    }}>
                    <span>{(time.m >= 10) ? time.m : "0" + time.m}</span>&nbsp;:&nbsp;
                    <span>{(time.s >= 10) ? time.s : "0" + time.s}</span>&nbsp;:&nbsp;
                    <span>{(time.ms >= 10) ? time.ms : "0" + time.ms}</span>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3 gap-3">
                {(status === 0) ?
                    <button className="btn btn-primary w-25" onClick={start}>Start</button> :
                    <button className="btn btn-primary w-25" onClick={stop}>Stop</button>
                }
                <button className="btn btn-outline-danger w-25" onClick={reset}>Reset</button>
            </div>
        </>
    )
}

export default StopWatch