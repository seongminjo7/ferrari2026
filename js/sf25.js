gsap.registerPlugin(ScrollTrigger);

// ✅ 1️⃣ 텍스트 등장
const split = new SplitType(".title", { types: "chars" });
const chars = split.chars;

gsap.fromTo(
  chars,
  { y: 100, opacity: 0, color: "var(--main-red)" },
  {
    y: 0,
    opacity: 1,
    color: "var(--main-white)",
    duration: 2,
    ease: "power3.out",
    stagger: { each: 0.05, from: "random" },
    scrollTrigger: {
      trigger: ".sf25",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    onStart: () => {
      document.querySelector(".title").style.opacity = 1;
    },
  }
);

// ✅ 2️⃣ 가로 스크롤
const img = document.querySelector(".scroll img");
const title = document.querySelector(".title");

// 이미지 로드 전후 모두 처리되게 안전하게 실행
function setupScroll() {
  const moveDistance = img.offsetWidth + window.innerWidth;

  gsap.fromTo(
    img,
    { x: window.innerWidth }, // 오른쪽 화면 밖
    {
      x: -img.offsetWidth, // 왼쪽 화면 밖으로 나감
      ease: "none",
      scrollTrigger: {
        trigger: ".sf25",
        start: "top top",
        end: "+=" + moveDistance,
        pin: true,
        scrub: 1, // ✅ 부드럽게 연동
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          // 제목 서서히 사라지기
          if (p < 0.3) {
            title.style.opacity = 1 - p * 3.3;
            title.style.display = "block";
          } else {
            title.style.opacity = 0;
            title.style.display = "none";
          }
          // 되돌릴 때 다시 보이게
          if (p < 0.05) {
            title.style.display = "block";
            title.style.opacity = 1;
          }
        },
      },
    }
  );
}

// 이미지가 이미 로드된 경우도 처리
if (img.complete) {
  setupScroll();
} else {
  img.addEventListener("load", setupScroll);
}