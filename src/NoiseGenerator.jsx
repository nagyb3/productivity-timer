import React from "react";
import * as Tone from 'tone'

export default function NoiseGenerator() {

    const [isPlaying, setIsPlaying] = React.useState(false);

    const noise = new Tone.Noise().toDestination();
    noise.type = "brown";

    function handleClick() {
        noise.start();
    }

    function handleStop() {
        noise.stop("+0");
    }

    console.log(isPlaying);

    function handleBrown() {
        noise.type = "brown";
    }

    function handleWhite() {
        noise.type = "white";
    }

    function handlePink() {
        noise.type = "pink";
    }

    return (
        <div className="noise-generator-container card">
            Noisegenerator
            <button onClick={handleClick}>play</button>
            <button onClick={handleStop}>stop</button>
            <div className="choose-type">
                <button onClick={handleBrown} className="handle-brown">brown</button>
                <button onClick={handlePink} className="handle-pink">pink</button>
                <button onClick={handleWhite} className="handle-white">white</button>
            </div>
        </div>
    )
}