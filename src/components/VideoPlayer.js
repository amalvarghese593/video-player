import React, { useRef, useEffect, useState } from "react";
import "./videoplayer.css";
import vid from "../video/sintel-short.mp4";
import play from "../logos/play.svg";
import pause from "../logos/pause.svg";
import full from "../logos/full.svg";
import back from "../logos/back.svg";
import exitFull from "../logos/exitFull.svg";
import thumbnail from "../logos/thumbnail.svg";
import forward from "../logos/forward.svg";

export const VideoPlayer = () => {
  const vidRef = useRef();
  const barRef = useRef();
  const [flag, setFlag] = useState(true);
  const [flag2, setFlag2] = useState(true);
  const [flag3, setFlag3] = useState(true);

  const [thmb, setThmb] = useState({ backgroundColor: "#f8f9fa" });
  const thumbFtn = () => {
    setThmb({
      display: "none",
    });
    setFlag3(!flag3);
  };

  useEffect(() => {
    fn2();
  }, [flag, flag3]);

  const [timeLapsed, setTimeLapsed] = useState("00:00");
  const [totalDuration, setTotalDuration] = useState("00:00");
  const [durationSec, setDurationSec] = useState(0);

  const calcTime = (timeNum) => {
    const d = Number(timeNum);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    const mDisplay = m > 0 ? (m > 9 ? m : `0${m}`) : "00";
    const sDisplay = s > 0 ? (s > 9 ? s : `0${s}`) : "00";
    const timeString =
      h > 0 ? `${h}:${mDisplay}:${sDisplay}` : `${mDisplay}:${sDisplay}`;
    return timeString;
  };

  const fn1 = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setDurationSec(duration);
    const dynWidth = (currentTime / duration) * 100 + "%";
    const bar2 = document.querySelector(".orange-bar");
    bar2.style.width = dynWidth;
    const t = calcTime(currentTime);
    setTimeLapsed(t);
    if (totalDuration === "00:00") {
      const d1 = calcTime(duration);
      setTotalDuration(d1);
    }
  };
  const media = document.getElementById("videoId");

  const fn2 = () => {
    if (media) {
      if (media.paused) {
        media.play();
      } else {
        media.pause();
      }
    }
  };
  const mediaForward = () => {
    if (media) {
      media.currentTime += 10;
    }
  };
  const mediaBackward = () => {
    if (media) {
      media.currentTime -= 10;
    }
  };

  const containerVideo = document.querySelector(".rc-video");
  const fullFn = () => {
    if (containerVideo) {
      containerVideo.requestFullscreen();
    }
    setFlag2(!flag2);
  };
  const exitFullFn = () => {
    if (containerVideo) {
      document.webkitExitFullscreen();
    }
    setFlag2(!flag2);
  };

  const cBar = document.querySelector(".c-bar");
  const seekFn = (e) => {
    const totalWidth = cBar.clientWidth;
    const currentWidth = e.nativeEvent.offsetX;
    media.currentTime = (currentWidth / totalWidth) * durationSec;
  };

  const videoEnded = () => {
    setThmb({
      display: "block",
      backgroundColor: "#f8f9fa",
    });
  };
  return (
    <div className="video-wrapper">
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          return false;
        }}
        className="rc-video"
      >
        <div className="thumbnail-svg" style={thmb}>
          <img src={thumbnail} alt="thumbnail logo" onClick={thumbFtn} />
        </div>
        <video
          onTimeUpdate={fn1}
          onEnded={videoEnded}
          id="videoId"
          ref={vidRef}
          className="video"
        >
          <source src={vid} type="video/mp4" />
          <source src={vid} type="video/webm" />
          <p>video not supported in this browser</p>
        </video>

        <div className="empty">
          <div className="controls">
            <div className="c-bar" onClick={seekFn}>
              <div ref={barRef} id="Bar" className="orange-bar"></div>
            </div>
            <div className="btn">
              <img src={back} alt="back logo" onClick={mediaBackward} />
              {flag === false ? (
                <img
                  src={play}
                  alt="play logo"
                  onClick={() => {
                    setFlag(!flag);
                  }}
                />
              ) : (
                <img
                  src={pause}
                  alt="pause logo"
                  onClick={() => {
                    setFlag(!flag);
                  }}
                />
              )}
              <img src={forward} alt="forward logo" onClick={mediaForward} />
              <div className="time-c">
                {flag2 === true ? (
                  <img src={full} alt="full logo" onClick={fullFn} />
                ) : (
                  <img
                    src={exitFull}
                    alt="exitfull logo"
                    onClick={exitFullFn}
                  />
                )}
                <div className="time-bar">
                  <span className="timeLapsed">{timeLapsed}</span> /&nbsp;
                  <span className="totalDuration">{totalDuration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
