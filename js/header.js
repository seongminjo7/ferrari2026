document.addEventListener("DOMContentLoaded", () => {

    const headerLogo = document.querySelector("#headerLogo");
    const ham = document.querySelector(".ham");
    const nav = document.querySelector("nav.gnb");
    const raceSchedule = document.querySelector(".raceSchedule");

    let menuOpen = false;
    let inRaceSchedule = false;

    // 🔹 로고 업데이트
    function updateLogo() {
        if (!headerLogo) return;

        if (menuOpen || inRaceSchedule) {
            headerLogo.classList.add("fade-out");
            setTimeout(() => {
                headerLogo.src = "/ferrari_logo_black.svg";
                headerLogo.classList.remove("fade-out");
            }, 150);

            // ham 색 변경
            ham.style.setProperty("--ham-color", "var(--main-black)");
            ham.querySelectorAll("span").forEach(span => {
                span.style.backgroundColor = "var(--main-black)";
            });

        } else {
            headerLogo.classList.add("fade-out");
            setTimeout(() => {
                headerLogo.src = "/ferrari_logo_white.svg";
                headerLogo.classList.remove("fade-out");
            }, 150);

            // ham 색 복원
            ham.querySelectorAll("span").forEach(span => {
                span.style.backgroundColor = "var(--main-white)";
            });
        }
    }



    // =========================
    // 메뉴 열기 / 닫기
    // =========================
    function openMenu() {
        menuOpen = true;
        nav.classList.add("open");
        ham.classList.add("on");

        document.querySelector(".line01").classList.add("on");
        document.querySelector(".line02").classList.add("on");
        document.querySelector(".line03").classList.add("on");

        updateLogo();
    }

    function closeMenu() {
        menuOpen = false;
        nav.classList.remove("open");
        ham.classList.remove("on");

        document.querySelector(".line01").classList.remove("on");
        document.querySelector(".line02").classList.remove("on");
        document.querySelector(".line03").classList.remove("on");

        updateLogo();
    }

    // 클릭 토글
    ham.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
        }
    });

    // =========================
    // raceSchedule 감지
    // =========================
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    inRaceSchedule = true;
                } else {
                    inRaceSchedule = false;
                }
                updateLogo();
            });
        },
        { threshold: 0.5 }
    );

    if (raceSchedule) observer.observe(raceSchedule);

});
