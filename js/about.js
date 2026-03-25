gsap.registerPlugin(ScrollTrigger);

// 한 줄씩 순차적으로 나타나는 타임라인
gsap.from(".textWrpper p", {
    scrollTrigger: {
        trigger: ".about",      // 기준 요소
        start: "top 30%",       // 섹션 상단이 화면의 60% 지점에 도달했을 때 시작
        end: "top 20%",         // 애니메이션이 완료될 지점
        scrub: 4,             // 스크롤 속도에 맞춰 애니메이션 진행 (숫자가 클수록 부드럽고 느림)
        markers: false,         // 테스트 시 true로 바꾸면 시작/끝 가이드라인이 보입니다
    },
    y: 100,                     // 더 아래쪽(100px)에서 올라오도록 설정
    opacity: 0,
    stagger: 0.5,               // 문장 간의 간격을 넉넉히 배치
    ease: "power1.out",
    duration: 2                 // scrub을 쓰지 않을 경우를 대비한 기본 지속 시간
});

// 마우스 움직임에 따른 배경 반대 이동 효과
const aboutSection = document.querySelector('.about');

aboutSection.addEventListener('mousemove', (e) => {
    // 섹션 내에서의 마우스 상대 위치 계산 (0 ~ 1 사이 값)
    const { width, height } = aboutSection.getBoundingClientRect();
    const moveX = (e.clientX / width) - 0.5;
    const moveY = (e.clientY / height) - 0.5;

    // 마우스 반대 방향으로 움직이게 설정 (숫자를 키우면 더 많이 움직임)
    // 마우스가 오른쪽으로 가면 배경은 왼쪽(-30px)으로 이동
    gsap.to(".about", {
        duration: 0.6,
        backgroundPosition: `${50 + moveX * -30}% ${50 + moveY * -30}%`,
        ease: "power2.out"
    });
});

// 마우스가 섹션을 벗어나면 다시 중앙으로 부드럽게 복귀
aboutSection.addEventListener('mouseleave', () => {
    gsap.to(".about", {
        duration: 1,
        backgroundPosition: "50% 50%",
        ease: "power2.out"
    });
});