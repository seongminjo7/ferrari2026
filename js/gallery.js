window.onload = () => {
  const section = document.querySelector('.gallery');
  const imgs = []; // 화면에 들어갈 이미지들을 모아두는 배열
  const imgMax = 60; // 생성될 이미지의 최대 갯수
  const imgW = 200;
  const imgH = 300;
  const imgSrc = [
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery01.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery02.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery03.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery04.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery05.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery06.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery06.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery07.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery08.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery09.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery10.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery11.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery12.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery13.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery14.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery15.jpeg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery16.jpg',
    'https://raw.githubusercontent.com/seongminjo7/ferrari_gallery/main/gallery17.JPG',
  ];


  const minInterval = 80; // 최소 반복 ( ms )
  const minDist = 80; // 최소 간격 ( px )
  let lastTime = 0; // 마지막 생성 시간을 저장
  let lastX = null;
  let lastY = null;
  // 마지막 생성 요소의 위치값을 저장

  function imgSpray(x, y) {
    const now = performance.now()
    // performance.now() = 브라우저에서 제공하는 시간 측정 api
    // 현재 페이지가 로드된 시점부터 이후의 경과 시간을 반환 ( ms )
    // Date.now() 랑 다른 점은 ms 단위까지 반환해 세밀한 시간 조정이 가능
    if (now - lastTime < minInterval) return false; // 더이상 생성하지 못하게 함
    if (lastX != null && lastY != null) {
      const dx = x - lastX;
      const dy = y - lastY;
      if (Math.hypot(dx, dy) < minDist) return false;
      // hypot = 두 점 사이의 거리 ( 피타고라스 정리를 활용해서 거리를 계산 )
    }
    lastTime = now;
    lastX = x;
    lastY = y;

    return true
    /* 
        return의 의미
        return문을 만나면 해당 함수를 종료
        뒤에 값이 있으면 값을 반환
        뒤에 값이 없으면 undefined

        return에서 true와 flase의 의미
        함수에서 true나 false를 반환하게 되면 그 값이 조건의 판별 결과값으로 활용하여 다른 조건문에서 활용할 수 있음
    */
  }
  function spray(x, y) {
    const el = imgs.length < imgMax ? document.createElement('img') : imgs.shift()
    el.classList.add('item');
    section.appendChild(el)

    el.src = imgSrc[Math.floor(Math.random() * imgSrc.length)]
    const rot = Math.random() * 30 - 10
    const tx = x - imgW / 2;
    const ty = y - imgH / 2;

    // 이미지들의 초기값 설정
    el.style.transition = 'none';
    el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(0)`;
    // el.style.opacity = '1'
    el.style.transition = `600ms`;

    el.offsetWidth; // 초기값 리플로우 실행

    requestAnimationFrame(() => {
      el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(1)`;

      setTimeout(() => {
        el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(0)`
        // el.style.opacity = '0'
      }, 1000) // 이미지가 생성 되고 나서 1초 뒤에 사라짐
    })
    imgs.push(el)
    console.log(imgs)
  }

  section.addEventListener('mousemove', (el) => {
    const rect = section.getBoundingClientRect();
    const x = el.clientX - rect.left;
    const y = el.clientY - rect.top;
    if (imgSpray(x, y)) {
      spray(x, y)
    }
  })

}