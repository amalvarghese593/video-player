import React, { useRef } from "react";
import "./videoplayer.css";
import vid from "../video/sintel-short.mp4";

export const VideoPlayer = () => {
  const vidRef = useRef();
  const barRef = useRef();
  console.log(vidRef);
  const fn1 = () => {};
  return (
    <div className="video-wrapper">
      <div className="c-video">
        <video onTimeUpdate={fn1} ref={vidRef} autoPlay>
          <source src={vid} type="video/mp4" />
          <source src={vid} type="video/webm" />
          <p>video not supported in this browser</p>
        </video>
        <div className="controls">
          <div className="orange-bar">
            <div ref={barRef} className="orange-juice"></div>
          </div>
          <div className="btn">
            <button>play</button>
          </div>
        </div>
      </div>
    </div>
  );
};
