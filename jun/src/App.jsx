import { useRef } from "react";
import "./APP.css";

export default function VideoPlayer() {
  const videoRef = useRef();

  return (
    <div style={{ textAlign: "center" }}>
      <div className="logo-container">
        <img className="Tube-img" src='./BsTube.png' alt="Tube" />
        <h2 className="YouTube">BssmTube</h2>
        <p className="KR">KR</p>
      </div>

      <div className="video-wrapper">
        <video className = "Video"
          ref={videoRef}
          src="/홍보영상(720).mp4"
          type="video/mp4"
        />
      </div>

      {/* <div>
        <button onClick={() => videoRef.current.play()}>재생</button>
        <button onClick={() => videoRef.current.pause()}>멈춤</button>
        <button onClick={() => videoRef.current.volume = 1}>볼륨 max</button>
        <button onClick={() => videoRef.current.muted = true}>음소거</button>
        <button onClick={() => videoRef.current.playbackRate = 2}>2배속</button>
        <button onClick={() => videoRef.current.playbackRate = 0.5}>0.5배속</button>
        <button onClick={() => videoRef.current.requestFullscreen()}>전체화면</button>
      </div> */}

      <div className = "Title-container">
        <img className = "Bssm-img" src = "./Bssm.svg"></img>
        <h2 className = "Video-Title">2025 부산SW마이스터고 홍보영상</h2>
        <button className = "gudock-btn">구독</button>
        <button className = "like-btn"><img className = "like-img" src = "./like.svg"></img></button>
        <button className = "unlike-btn"><img className = "unlike-img" src = "./unlike.svg"></img></button>
        <button className = "flag-btn"><img className = "flag-img" src = "./flag.png"></img>신고</button>
        
      </div>
    </div>
  );
}