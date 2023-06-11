import { useState, useEffect } from 'react';
import "./App.css"

function CountdownTimer() {
    
    const [timer, setTimer] = useState(1800); // 30 minutes in seconds

    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    const handleStart = () => {
        setIsRunning(!isRunning);
    };

    function handleMinuteChange() {
        let hours = 0;
        let minutes = 0;
        let newAmount = prompt("");
        newAmount = [...newAmount]
        let seconds = parseInt(newAmount.splice(newAmount.length - 2, 2).join(''));
        if (newAmount.length > 0) {
            minutes = parseInt(newAmount.splice(newAmount.length - 2, 2).join(''))
        }
        if (newAmount.length > 0) {
            hours = parseInt(newAmount.join(''));
        }
        console.log(hours, minutes, seconds)
        setTimer(hours * 3600 + minutes * 60 + seconds)
    }

    function handleReset() {
        isRunning && setIsRunning(false);
        setTimer(1800);
    }

    return (
        <div className='countdown-container'>
            <div className="top-row">
                <button onClick={handleStart}>{isRunning ? "STOP" : "START"}</button>
                <button onClick={handleReset}>RESET</button>
            </div>
            <p onClick={handleMinuteChange}>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
        </div>
    );
}

export default CountdownTimer;
