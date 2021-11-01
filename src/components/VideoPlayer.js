import React, { useRef, useEffect, useState } from "react";
import "./videoplayer.css";
import vid from "../video/sintel-short.mp4";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="66"
            height="66"
            color="#ff6d25"
            fill="currentColor"
            class="bi bi-play-btn-fill"
            viewBox="0 0 16 16"
            onClick={thumbFtn}
          >
            <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
          </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={mediaBackward}
                color="#fff"
                width="36"
                height="36"
                fill="currentColor"
                class="bi bi-arrow-counterclockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
              </svg>
              {flag === false ? (
                <svg
                  onClick={() => {
                    setFlag(!flag);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  color="#fff"
                  width="36"
                  height="36"
                  fill="currentColor"
                  class="bi bi-play-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    setFlag(!flag);
                  }}
                  color="#fff"
                  width="36"
                  height="36"
                  fill="currentColor"
                  class="bi bi-pause-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z" />
                </svg>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={mediaForward}
                color="#fff"
                width="36"
                height="36"
                fill="currentColor"
                class="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
              </svg>

              <div className="time-c">
                {flag2 === true ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={fullFn}
                    color="#fff"
                    width="26"
                    height="26"
                    fill="currentColor"
                    class="bi bi-fullscreen"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={exitFullFn}
                    width="26"
                    height="26"
                    fill="currentColor"
                    class="bi bi-fullscreen-exit"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z" />
                  </svg>
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
