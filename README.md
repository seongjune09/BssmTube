# 🎬 BssmTube
<img width="1470" height="826" alt="image" src="https://github.com/user-attachments/assets/eac4dabf-ada5-41dd-ae87-d6976181d471" /> <br>

📅 2025.10.14 ~ 2025.10.21


React 수업 시간에 진행한 React 활용 과제입니다. 


영상 제어 기능을 구현하며 다양한 미디어 기술을 직접 다뤄본 프로젝트입니다.

---

# 기술적 구현

**(1) 비디오 제어 시스템**
재생/일시정지
* useRef로 video 요소 참조
* video.play() / video.pause() 메서드로 재생 상태 제어
* `useState`로 재생 상태 UI 동기화

음소거 토글
* `video.muted` 속성 제어
* 아이콘 변경으로 시각적 피드백 제공

---

**(2) 해상도 및 재생속도 조절**
해상도 변경
* 현재 재생 시간(`currentTime`) 저장 후 영상 교체
* `video.load()` 및 `onloadedmetadata` 이벤트로 끊김 없는 전환
* 드롭다운 메뉴로 360p ~ 1080p 선택 가능

재생속도 조절
* `video.playbackRate` 속성 제어
* 0.5배속 ~ 2.0배속 지원
```jsx
const handleResolutionSelect = (res) => {
  const video = videoRef.current;
  const currentTime = video.currentTime;
  
  video.src = `/${currentVideo}_${res}.mp4`;
  video.load();
  
  video.onloadedmetadata = () => {
    video.currentTime = currentTime;
    video.play();
  };
};
```

---

**(3) 키보드 단축키**
* `useEffect`와 `addEventListener`로 전역 키보드 이벤트 처리
* Space: 재생/일시정지
* ← →: 5초 건너뛰기
* ↑ ↓: 볼륨 조절
* M: 음소거 토글
* F: 전체화면 토글
```jsx
useEffect(() => {
  const handleKeyDown = (e) => {
    switch (e.code) {
      case "Space":
        togglePlay();
        break;
      case "ArrowLeft":
        video.currentTime = Math.max(video.currentTime - 5, 0);
        break;
      // ...
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);
```

---

# ‼️ 트러블 슈팅

**문제상황**
- 해상도별(360p, 480p, 720p, 1080p) 영상 파일을 별도로 준비하여 사용자가 화질을 선택할 수 있도록 구현
- 해상도 변경 시 새로운 영상 파일로 교체되면서 재생 위치가 초기화되는 문제 발생
- 사용자가 영상을 보다가 화질을 변경하면 처음부터 다시 시작되어 불편함

**해결 방법**
- 해상도 변경 전 현재 재생 시간(video.currentTime)을 변수에 저장
- 새로운 해상도의 영상 파일로 video.src 교체 후 video.load() 실행
  
```jsx
const handleResolutionSelect = (res) => {
  const video = videoRef.current;
  const currentTime = video.currentTime; // 현재 재생 위치 저장
  
  video.src = `/${currentVideo}_${res}.mp4`; // 해상도 변경
  video.load();
  
  video.onloadedmetadata = () => {
    video.currentTime = currentTime; // 재생 위치 복원
    video.play(); // 자동 재생
  };
  
  setSelectedResolution(res);
};
```

---

# 🍀 느낀 점 및 배운 점
이번 프로젝트를 진행하며 react의 useRef와 useState를 활용한 상태 관리 및 DOM 제어를 경험했습니다.
비디오 API(play(), pause(), currentTime 등)를 직접 다루며 미디어 제어 기술에 대한 이해도를 높였습니다.
수업 시간에 배운 기본적인 영상 제어 기능을 넘어 해상도 변경, 재생속도 조절, 키보드 단축키 등 실제 영상 플랫폼 수준의 기능을 구현하며 새로운 기술을 접해보며 흥미가 생겼으며
해상도 변경 시 재생 위치 초기화 문제를 onloadedmetadata 이벤트로 해결하는 과정에서 문제 해결 능력을 키울 수 있었습니다.
복잡해 보였던 기능들을 하나씩 구현해내며 React 개발의 재미를 느꼈던 프로젝트 였습니다.

---

# 기술 스택

<img height="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" />   

---

# 배포 링크
[🌐 BssmTube 바로가기](https://bssmtube.vercel.app/) *(맥북 화면 기준  [2880 x 1864])*

---

# [▶ 시연 영상 확인하기](https://www.youtube.com/watch?v=1ryhrt201qw)

---



