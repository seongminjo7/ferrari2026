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


  
gsap.utils.toArray(".driverCard").forEach((card, i) => {

  const randomRotate = gsap.utils.random(-45, 45);
  const xOffset = Number(card.dataset.offset) || 0;

  gsap.fromTo(card,
    {
      y: 250 + i * 60,
      x: xOffset,
      rotate: randomRotate,
      opacity: 1,      // ⭐ 항상 보이게
      scale: 0.85,
    },
    {
      y: -2600,        // ⭐ 더 멀리 위로 보내기
      x: xOffset * 0.3,
      rotate: randomRotate + gsap.utils.random(20, 60),
      opacity: 1,      // ⭐ 사라지지 않게
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".driver",
        start: "top 20%",     // 늦게 시작
        end: "bottom -180%",  // ⭐ 스크롤 구간 크게 늘림 → 섹션 끝날 때 도착
        scrub: 1.5,
      }
    }
  );
  
});




});
