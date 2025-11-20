const sponsor = document.querySelector('.sponsor');

// 리스트 내용 자동 복제
sponsor.innerHTML += sponsor.innerHTML;

let left = 100;
const speed = 1;

function scroll() {
    left -= speed;
    sponsor.style.transform = `translateX(${left}px)`;

    // 원본 리스트 길이 기준으로 리셋
    const firstHalfWidth = sponsor.scrollWidth / 2;

    if (Math.abs(left) >= firstHalfWidth) {
        left = 0; // 위치 초기화
    }

    requestAnimationFrame(scroll);
}

scroll();
