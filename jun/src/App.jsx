import { useRef, useState, useEffect } from "react";
import "./APP.css";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreen, setIsScreen] = useState(false);
  const [isGudock, setIsGudock] = useState(false);
  const [resolutionMenuOpen, setResolutionMenuOpen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState("720");
  const resolutions = ["360", "480", "720", "1080"];
  const [likeCount, setLikeCount] = useState(2.6);
  const [isLiked, setIsLiked] = useState(false); 
  const [isUnliked, setIsUnliked] = useState(false); 
  const [Flag, setFlag] = useState(false);

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

  const toggleGudock = () => setIsGudock(!isGudock);

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
    const video = videoRef.current;
    const currentTime = video.currentTime;

    video.src = `/홍보영상_${res}.mp4`;
    video.load();

    video.onloadedmetadata = () => {
      video.currentTime = currentTime;
      video.play();
    };

    setSelectedResolution(res);
    setResolutionMenuOpen(false);
  };

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(2.6);
    } else {
      setIsLiked(true);
      setIsUnliked(false);
      setLikeCount(2.7);
    }
  };
  
  const handleUnlike = () => {
    if (isUnliked) {
      setIsUnliked(false);
    } else {
      setIsUnliked(true);
      if (isLiked) {
        setIsLiked(false);
        setLikeCount(2.6);
      }
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
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div className="logo-container">
        <img className="Tube-img" src="./BsTube.png" alt="Tube" />
        <h2 className="YouTube">BssmTube</h2>
        <p className="KR">KR</p>
        <button className = "Mascot-btn" >
          <img className="Mascot" src="./Mascot.png" alt="Mascot"/>
        </button>
      </div>

    <div
      className="video-section"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "20px",
      }}
    >
      <div className="video-wrapper">
        <video
          className="Video"
          ref={videoRef}
          src={`/홍보영상_${selectedResolution}.mp4`}
          type="video/mp4"
        />
      </div>

      <div
        className="side-videos"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >

        <div className="Video1">
          <img
            src="./Video1.png"
            alt="Video1"
            style={{ width: "281px", borderRadius: "10px" }}
          />
          <p>2025 BSSM 졸업작품전</p>
        </div>

        <div className="Video2">
          <img
            src="./Video2.png"
            alt="Video2"
            style={{ width: "281px", borderRadius: "10px" }}
          />
          <p>2025 BSSM 졸업작품 홍보 영상</p>
        </div>

        <div className="Video3">
          <img
            src="./Video3.png"
            alt="Video3"
            style={{ width: "281px", borderRadius: "10px" }}
          />
          <p>2021 BSSM 홍보 영상</p>
        </div>

      </div>
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
        <h2 className="Video-Title">2025 부산SW마이스터고 홍보영상</h2>

        <button
          onClick={toggleGudock}
          className={`gudock-btn ${isGudock ? "subscribed" : "subscribe"}`}
        >
          {isGudock ? (
            <>
              구독중 <img className="Bell-img" src="Bell.png" alt="벨" />
            </>
          ) : (
            "구독"
          )}
        </button>

          <button
            className={`like-btn ${isLiked ? "liked" : "like"}`}
            onClick={handleLike}
          >
            <img className="like-img" src="./like.png" alt="like" />
            {likeCount.toFixed(1)}만
          </button>


          <button
            className={`unlike-btn ${isUnliked ? "unliked" : "unlike"}`}
            onClick={handleUnlike}
          >
            <img className="unlike-img" src=" /Unlike.png" alt="unlike" />
          </button>

        <button
          className="flag-btn"
          onClick={() => {
            if (!Flag) {
              setFlag(true);
              alert("신고가 접수되었습니다 !");
            } else {
              alert("이미 신고가 접수되었습니다 !!");
            }
          }}
        >
          <img className="flag-img" src="./flag.png" alt="flag" />신고
        </button>
      </div>

  


    </div>
  );
}