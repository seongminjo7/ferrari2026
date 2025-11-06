const introVideo = document.querySelector(".intro-video");
const bgVideo = document.querySelector(".bg-video");
const introLogo = document.querySelector(".intro-logo");
const mainHeader = document.querySelector(".main-header");

let introPlayed = false;
let introTimer = null;

// ✅ 인트로 전환
function playIntroTransition(immediate = false) {
  if (introPlayed) return;
  introPlayed = true;

  introLogo.classList.add("show-white");
  document.body.style.background = "white";

  if (immediate) {
    introVideo.classList.add("hide-intro");
    bgVideo.classList.add("show-bg");
  } else {
    setTimeout(() => {
      introVideo.classList.add("hide-intro");
      bgVideo.classList.add("show-bg");
    }, 800);
  }
}

// 2.5초 후 자동 전환
introTimer = setTimeout(playIntroTransition, 2500);

// ✅ 스크롤 감지
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const introHeight = document.querySelector(".intro").offsetHeight;

  // 스크롤 시 즉시 인트로 종료
  if (!introPlayed && scrollY > 50) {
    clearTimeout(introTimer);
    playIntroTransition(true);
  }

  // 로고 위로 이동
  if (introPlayed && scrollY > 100 && scrollY < introHeight - 200) {
    introLogo.classList.add("logo-moving");
  } else if (scrollY <= 100) {
    introLogo.classList.remove("logo-moving");
  }

  // ✅ 인트로를 벗어나면 header 등장
  if (scrollY >= introHeight - 100) {
    introLogo.style.opacity = "0";
    mainHeader.classList.add("show");
  } else {
    introLogo.style.opacity = "1";
    mainHeader.classList.remove("show");
  }
});
