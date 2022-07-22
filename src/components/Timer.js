import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [clock, setClock] = useState({min: '00', sec: '00'});

    useEffect(() => {
        let second = 1;
        let minute = 0;
        const timerInterval = setInterval(() => {
            let m = minute < 10 ? "0" + minute : minute;
            let s = second < 10 ? "0" + second : second;
            setClock({sec: s, min: m});
            second++;
            if (second === 60) {
                second = 0;
                minute++;
            }
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    return(
        <div id="timer">
            <div id="click">{clock.min}:{clock.sec}</div>
        </div>
    )
}

export default Timer;