const introVideo = document.querySelector(".intro-video");
const bgVideo = document.querySelector(".bg-video");
const introLogo = document.querySelector(".intro-logo");
const mainHeader = document.querySelector(".main-header");
const introSection = document.querySelector(".intro");

let introPlayed = false;
let introTimer = null;

// ✅ 인트로 전환
function playIntroTransition(immediate = false) {
  if (introPlayed) return;
  introPlayed = true;

  introLogo.classList.add("show-white");
  // document.body.style.background = "white";

  if (immediate) {
    introVideo.classList.add("hide-intro");
    bgVideo.classList.add("show-bg");
    introVideo.style.display = "none"; // ⬅ 즉시 사라질 때 display:none
  } else {
    setTimeout(() => {
      introVideo.classList.add("hide-intro");
      bgVideo.classList.add("show-bg");

      // ⬅ 애니메이션 끝난 뒤 display:none
      setTimeout(() => {
        introVideo.style.display = "none";
      }, 600); // hide-intro 전환 시간 맞춰 조정
    }, 800);
  }
}

// 2.5초 후 자동 전환
introTimer = setTimeout(playIntroTransition, 2500);

// ✅ 스크롤 감지
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const introHeight = introSection.offsetHeight;

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

  // ✅ 인트로 벗어나면 header 등장 + introVideo 숨기기
  if (scrollY >= introHeight - 100) {
  introLogo.classList.add("hide-logo");
    mainHeader.classList.add("show");
    introVideo.style.display = "none"; // 스크롤 아래에서는 완전히 제거
  } else {
introLogo.classList.remove("hide-logo");
    mainHeader.classList.remove("show");
    introVideo.style.display = "block"; // 다시 위로 올리면 복구
  }
});







document.addEventListener("DOMContentLoaded", () => {
  const headerLogo = document.querySelector(".header-logo");
  const raceSchedule = document.querySelector(".raceSchedule");
  const mainHeader = document.querySelector(".main-header");

  // 안전 검사: 없으면 경고 출력하고 중단
  if (!headerLogo) {
    console.warn("headerLogo(.header-logo) 요소를 찾을 수 없습니다.");
    return;
  }
  if (!raceSchedule) {
    console.warn("raceSchedule(.raceSchedule) 요소를 찾을 수 없습니다.");
    return;
  }
  if (!mainHeader) {
    console.warn("mainHeader(.main-header) 요소를 찾을 수 없습니다.");
    return;
  }

  // 이미지 선로딩(플래시 방지)
  new Image().src = "/ferrari_logo_black.svg";
  new Image().src = "/ferrari_logo_white.svg";

  function updateHeaderLogo() {
    const raceRect = raceSchedule.getBoundingClientRect();
    const headerRect = mainHeader.getBoundingClientRect();

    const isOverlap =
      raceRect.top < headerRect.bottom &&
      raceRect.bottom > headerRect.top;

    if (isOverlap) {
      // src 변경 (setAttribute 사용 가능)
      headerLogo.setAttribute("src", "/ferrari_logo_black.svg");
    } else {
      headerLogo.setAttribute("src", "/ferrari_logo_white.svg");
    }
  }

  // 초기 호출 + 이벤트 바인드
  updateHeaderLogo();
  window.addEventListener("scroll", updateHeaderLogo, { passive: true });
  window.addEventListener("resize", updateHeaderLogo);
});





