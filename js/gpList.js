import { gpSections } from '../data/gpSections.js';

// ------------------------------
// 1. gpList 요소 가져오기
// ------------------------------
const gpList = document.querySelector('.gpList');


// ------------------------------
// 2. 기본 렌더링 (첫 번째 on)
// ------------------------------
function renderList(activeIndex = 0) {
    gpList.innerHTML = gpSections
        .map((gp, idx) => {
            const isOn = idx === activeIndex;

            if (isOn) {
                return `
                <li class="gp on">
                    <div class="gpTitle">
                        <h3>${gp.title}</h3>
                    </div>

                    <div class="gpinfo">
                        <div class="circuitImg">
                            <img src="${gp.circuit}" alt="${gp.title} circuit">
                        </div>

                        <ul class="gpSchedule">

                            <li>
                                <div class="day">
                                    <p class="date">${gp.date1}</p>
                                    <p class="month">${gp.month}</p>
                                </div>
                                <div class="dayTitle"><p>${gp.day1}</p></div>
                                <div class="time"><p>${gp.time1}</p></div>
                            </li>

                            <li>
                                <div class="day">
                                    <p class="date">${gp.date2}</p>
                                    <p class="month">${gp.month}</p>
                                </div>
                                <div class="dayTitle"><p>${gp.day2}</p></div>
                                <div class="time"><p>${gp.time2}</p></div>
                            </li>

                            <li>
                                <div class="day">
                                    <p class="date">${gp.date3}</p>
                                    <p class="month">${gp.month}</p>
                                </div>
                                <div class="dayTitle"><p>${gp.day3}</p></div>
                                <div class="time"><p>${gp.time3}</p></div>
                            </li>

                            <li>
                                <div class="day">
                                    <p class="date">${gp.date4}</p>
                                    <p class="month">${gp.month}</p>
                                </div>
                                <div class="dayTitle"><p>${gp.day4}</p></div>
                                <div class="time"><p>${gp.time4}</p></div>
                            </li>

                            <li>
                                <div class="day">
                                    <p class="date">${gp.date5}</p>
                                    <p class="month">${gp.month}</p>
                                </div>
                                <div class="dayTitle"><p>${gp.day5}</p></div>
                                <div class="time"><p>${gp.time5}</p></div>
                            </li>

                        </ul>
                    </div>
                </li>
                `;
            }

            // off 상태
            return `
                <li class="gp">
                    <div class="nextGpList">
                        <div class="nextTitle">
                            <h3>${gp.title}</h3>
                            <p>Grand Prix</p>
                        </div>
                        <p class="subDate">${gp.subDate}</p>
                        <div class="circuitImgSub">
                            <img src="${gp.subImg}" alt="${gp.title} circuit">
                        </div>
                    </div>
                </li>
            `;
        })
        .join('');
}


// ------------------------------
// 3. 처음 로딩: 첫 번째 on
// ------------------------------
renderList(0);


// ------------------------------
// 4. 클릭 이벤트 (on 이동)
// ------------------------------
gpList.addEventListener("click", (e) => {
    const li = e.target.closest(".gp");
    if (!li) return;

    const index = [...gpList.children].indexOf(li);
    renderList(index);
});
