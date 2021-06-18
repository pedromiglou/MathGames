import { useState, useEffect } from 'react';
import './Stopwatch.css';

function Stopwatch() {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setTime(time+1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
      }, [time]);

    return (
        <span id="stopwatch">
            <span className="minutes">
                { ('0' + Math.floor(time % 3600 / 60)).slice(-2) }:
            </span>
            <span className="seconds">
                { ('0' + Math.floor(time % 3600 % 60)).slice(-2) }
            </span>
        </span>
    );
}

export default Stopwatch;



