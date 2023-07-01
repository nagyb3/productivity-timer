import React from "react";
import * as Tone from 'tone'

export default function NoiseGenerator() {

    const [isPlaying, setIsPlaying] = React.useState(false);

    const [sliderState, setSliderState] = React.useState(-5);

    const [volume, setVolume] = React.useState(-12);

    const vol = new Tone.Volume(volume).toDestination();
    const noise = new Tone.Noise().connect(vol);

    React.useEffect(() => {
        noise.type = "brown";    
    }, [])

    function handleClick() {
        noise.start();
    }

    function handleStop() {
        noise.stop("+0");
    }

    // console.log(isPlaying);

    function handleBrown() {
        noise.stop("+0");
        noise.type = "brown";
        noise.start();
    }

    function handleWhite() {
        noise.stop("+0");
        noise.type = "white";
        noise.start();
    }

    function handlePink() {
        noise.stop("+0");
        noise.type = "pink";
        noise.start();
    }

    function handleChange(e) {
        e.preventDefault();
        setSliderState(e.target.value);
        setVolume(e.target.value);
        noise.stop("+0");
    }

    return (
        <div className="noise-generator-container card">
            <p className="noise">Noise</p>
            <div className="slider-container">
                <input type="range" min="-10" max="-2" value={sliderState}
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