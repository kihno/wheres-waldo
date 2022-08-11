import React, { useState, useEffect } from 'react';

const Timer = (props) => {
    const { setGameTime } = props;
    const [clock, setClock] = useState({sec: '00', min: '00'});

    useEffect(() => {
        let second = 1;
        let minute = 0;
        const timerInterval = setInterval(() => {
            let m = minute < 10 ? "0" + minute : minute;
            let s = second < 10 ? "0" + second : second;

            second++;
            if (second === 60) {
                second = 0;
                minute++;
            }

            setClock({sec: s, min: m});
            setGameTime({sec: s, min: m});
        }, 1000);
        
        return () => clearInterval(timerInterval);
    }, []);
    
    return(
        <div id="timer">
            <div id="clock">{clock.min}:{clock.sec}</div>
        </div>
    )
}

export default Timer;