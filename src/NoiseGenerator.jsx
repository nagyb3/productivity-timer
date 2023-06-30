import React from "react";
import * as Tone from 'tone'

export default function NoiseGenerator() {

    const [isPlaying, setIsPlaying] = React.useState(false);

    const [sliderState, setSliderState] = React.useState(5);

    const noise = new Tone.Noise().toDestination();
    noise.type = "brown";

    function handleClick() {
        noise.start();
    }

    function handleStop() {
        noise.stop("+0");
    }

    // console.log(isPlaying);

    function handleBrown() {
        noise.type = "brown";
    }

    function handleWhite() {
        noise.type = "white";
    }

    function handlePink() {
        noise.type = "pink";
    }

    function handleChange(e) {
        e.preventDefault();
        // console.log(e.target.value);
        setSliderState(e.target.value);
    }

    return (
        <div className="noise-generator-container card">
            <p className="noise">Noise</p>
            <div className="slider-container">
                <input type="range" min="0" max="10" value={sliderState}
                onChange={handleChange} />
            </div>
            <div className="start-stop">
                <button onClick={handleClick}>PLAY</button>
                <button onClick={handleStop}>STOP</button>
            </div>
            <div className="choose-type">
                <button onClick={handleBrown} className="handle-brown">brown</button>
                <button onClick={handlePink} className="handle-pink">pink</button>
                <button onClick={handleWhite} className="handle-white">white</button>
            </div>
        </div>
    )
}