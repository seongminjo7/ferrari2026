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



  const rotateList = [-25, 8];  // 카드 순서대로 적용될 각도들

  gsap.utils.toArray(".driverCard").forEach((card, i) => {

    const xOffset = Number(card.dataset.offset) || 0;
    const baseRotate = rotateList[i % rotateList.length]; // 카드 개수보다 많은 경우 대비

    gsap.fromTo(card,
      {
        y: 250 + i * 200,
        x: xOffset,
        rotate: baseRotate,
        opacity: 1,
        scale: 0.85,
      },
      {
        y: -2600,
        x: xOffset * 0.3,
        rotate: baseRotate + 40,  // 이동 후 원하는 변화량
        opacity: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".driver",
          start: "top 20%",
          end: "bottom -180%",
          scrub: 1.5,
        }
      }
    );
  });


});
