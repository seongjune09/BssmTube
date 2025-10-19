import { useRef, useState, useEffect } from "react";
import "./APP.css";


export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreen, setIsScreen] = useState();

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted); 
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!document.fullscreenElement) {
      video.requestFullscreen();
      setIsScreen(true);
    } else {
      document.exitFullscreen();
      setIsScreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const video = videoRef.current;
      if (!video) return;

      switch (e.code) {
        case "Space": 
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft": 
          video.currentTime = Math.max(video.currentTime - 5, 0);
          break;
        case "ArrowRight": 
          video.currentTime = Math.min(video.currentTime + 5, video.duration);
          break;
        case "ArrowUp": 
          e.preventDefault();
          video.volume = Math.min(video.volume + 0.1, 1);
          break;
        case "KeyM": 
          e.preventDefault();
          toggleMute();
          break;
        case "KeyF":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "ArrowDown": 
          e.preventDefault();
          video.volume = Math.max(video.volume - 0.1, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  

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

      <div className="video-controls">
        <button onClick={toggleMute}>
          {isMuted ? (
            <img className="Mute" src="./Mute.png" alt="Mute" />
          ) : (
            <img className="UnMute" src="./UnMute.png" alt="UnMute" />
          )}
        </button>
        <button><img className = "Setting" src = "./Setting.png"></img></button>
        <button onClick={() => videoRef.current.requestFullscreen()}><img className = "FullScreen" src = "./FullScreen.png"></img></button>
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