const targetDates = [
    new Date("2026-07-19T22:00:00+09:00"),  // 6/07 오후 10시
    new Date("2026-07-26T22:00:00+09:00"), // 5/04 오전 5시
    new Date("2026-08-23T22:00:00+09:00"),  // 5/25 오전 5시
]

let currentIndex = 0;

const elDay = document.getElementById("day");
const elHour = document.getElementById("hour");
const elMin = document.getElementById("min");
const elSec = document.getElementById("sec");

function two(n) {
    return String(n).padStart(2, "0")
        ;
}

function updateCountdown() { // KST
    const nowUTC = new Date();
    const nowKST = new Date(nowUTC.getTime() + 9 * 60 * 60 * 1000);

    let diff = targetDates[currentIndex] - nowKST;

    // ✅ 목표 시각이 지났으면 다음 이벤트로 전환
    if (diff <= 0) {
        currentIndex++;
        if (currentIndex >= targetDates.length) currentIndex = 0;
        diff = targetDates[currentIndex] - nowKST;
    }

    const msInSec = 1000;
    const msInMin = msInSec * 60;
    const msInHour = msInMin * 60;
    const msInDay = msInHour * 24;

    const days = Math.floor(diff / msInDay);
    diff %= msInDay;
    const hours = Math.floor(diff / msInHour);
    diff %= msInHour;
    const minutes = Math.floor(diff / msInMin);
    diff %= msInMin;
    const seconds = Math.floor(diff / msInSec);

    elDay.textContent = two(days);
    elHour.textContent = two(hours);
    elMin.textContent = two(minutes);
    elSec.textContent = two(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);