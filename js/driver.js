gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const path = document.querySelector("#driverSvg path");
  const length = path.getTotalLength();

  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".driver",
      start: "top 80%",           // driver가 화면 상단에 닿을 때 시작
      end: "bottom bottom",       // driver가 완전히 사라질 때 끝
      scrub: 1,
      pin: ".driver-pin",         // ✅ sticky 대신 GSAP이 직접 pin 처리
      // markers: true, // 디버깅용
    },
  });
});
