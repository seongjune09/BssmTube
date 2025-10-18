import { useRef } from "react";

export default function VideoPlayer() {

  const videoRef = useRef();

  return (
    <div style={{ textAlign: "center" }}>

    

      <video
      ref = {videoRef}
        width="900"
        src="/song.mp4"
        type = "video/mp4"
      />
      <button onClick = {() => videoRef.current.play()}>재생</button>
      <button onClick = {() => videoRef.current.pause()}>멈춤</button>
      <button onClick = {() => videoRef.current.volume = 1}>볼륨 max</button>
      <button onClick = {() => videoRef.current.muted = true}>음소거</button>
      <button onClick = {() => videoRef.current.playbackRate = 2}>2배속</button>
      <button onClick = {() => videoRef.current.playbackRate = 0.5}>0.5배속</button>
      <button onClick = {() => videoRef.current.requestFullscreen()}>전체화면</button>

    </div>
  );
}

