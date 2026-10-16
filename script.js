const wrapper = document.getElementById('bannerWrapper');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let autoPlayInterval;
let resumeTimeout;

// 1. 슬라이드 이동 함수
function goToSlide(index) {
    currentIndex = index;
    if (currentIndex > 2) currentIndex = 0;
    if (currentIndex < 0) currentIndex = 2;
    
    wrapper.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
    
    // 점 표시 업데이트
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// 2. 자동 재생 시작
function startAutoPlay() {
    stopAutoPlay(); // 중복 방지
    autoPlayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 3000);
}

// 3. 자동 재생 정지
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
    clearTimeout(resumeTimeout);
}

// 4. 사용자 조작 후 재개 로직 (5초 후 다시 시작)
function handleUserInteraction() {
    stopAutoPlay();
    resumeTimeout = setTimeout(() => {
        startAutoPlay();
    }, 5000);
}

// 5. 스와이프 기능 (터치 및 마우스)
let startX = 0;
let isDragging = false;

wrapper.addEventListener('mousedown', (e) => {
    startX = e.pageX;
    isDragging = true;
    stopAutoPlay();
});

wrapper.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    const endX = e.pageX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) { // 50px 이상 움직였을 때
        if (diff > 0) goToSlide(currentIndex + 1);
        else goToSlide(currentIndex - 1);
    }
    isDragging = false;
    handleUserInteraction();
});

// 터치 이벤트 (모바일)
wrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    stopAutoPlay();
});

wrapper.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].pageX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) goToSlide(currentIndex + 1);
        else goToSlide(currentIndex - 1);
    }
    handleUserInteraction();
});

// 인디케이터 클릭 이벤트
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        handleUserInteraction();
    });
});

// 초기 실행
startAutoPlay();