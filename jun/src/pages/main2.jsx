import { useRef, useState, useEffect } from "react";
import "./APP.css";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreen, setIsScreen] = useState(false);
  const [resolutionMenuOpen, setResolutionMenuOpen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState("720"); 
  const resolutions = ["360", "480", "720", "1080"];

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

  const handleResolutionSelect = (res) => {
    setSelectedResolution(res);
    setResolutionMenuOpen(false);

    const currentTime = videoRef.current.currentTime;
    videoRef.current.src = `/졸작_${res}.mp4`;
    videoRef.current.currentTime = currentTime;
    videoRef.current.play(); 
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
        case "ArrowDown": 
          e.preventDefault();
          video.volume = Math.max(video.volume - 0.1, 0);
          break;
        case "KeyM": 
          e.preventDefault();
          toggleMute();
          break;
        case "KeyF":
          e.preventDefault();
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isMuted]);

  return (
    <div style={{ textAlign: "center" }}>
      <div className="logo-container">
        <img className="Tube-img" src='./BsTube.png' alt="Tube" />
        <h2 className="YouTube">BssmTube</h2>
        <p className="KR">KR</p>
      </div>

      <div className="video-wrapper">
        <video
          className="Video"
          ref={videoRef}
          src={`/졸작_${selectedResolution}.mp4`}
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

        <div style={{ position: "relative", display: "inline-block" }}>
          <button onClick={() => setResolutionMenuOpen(!resolutionMenuOpen)}>
            <img className="Resolution" src="./Resolution.png" alt="Resolution" />
          </button>
          {resolutionMenuOpen && (
            <div className="resolution-menu">
              {resolutions.map((res) => (
                <div
                  key={res}
                  className={`resolution-item ${selectedResolution === res ? "active" : ""}`}
                  onClick={() => handleResolutionSelect(res)}
                >
                  {res}p
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={toggleFullscreen}>
          <img className="FullScreen" src="./FullScreen.png" alt="Fullscreen" />
        </button>
      </div>

      <div className="Title-container">
        <img className="Bssm-img" src="./Bssm.svg" alt="Bssm" />
        <h2 className="Video-Title">2025 BSSM 졸업작품전</h2>
        <button className="gudock-btn">구독</button>
        <button className="like-btn"><img className="like-img" src="./like.svg" alt="like"/></button>
        <button className="unlike-btn"><img className="unlike-img" src="./unlike.svg" alt="unlike"/></button>
        <button className="flag-btn"><img className="flag-img" src="./flag.png" alt="flag"/>신고</button>
      </div>
    </div>
  );
}