document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.event-slider');
    const events = document.querySelectorAll('.event');
    const visibleItems = 4; // 한 번에 보일 항목 수
    const totalItems = events.length;
    const itemWidth = events[0].offsetWidth; // 각 항목의 너비
    const sliderWidth = itemWidth * totalItems; // 전체 슬라이더의 너비

    // 슬라이더의 전체 너비를 조정하여 무한 루프 효과를 구현
    slider.style.width = `${sliderWidth}px`;

    // 슬라이더에 복제된 항목 추가 (무한 루프 효과를 위해)
    for (let i = 0; i < visibleItems; i++) {
        const clone = events[i].cloneNode(true);
        slider.appendChild(clone);
    }

    let index = 0;
    let autoSliding = true;

    function startAutoSlide() {
        autoSliding = true;
        autoSlide();
    }

    function stopAutoSlide() {
        autoSliding = false;
    }

    function autoSlide() {
        if (!autoSliding) return;

        index++;
        if (index >= totalItems) {
            index = 0; // 마지막 항목 후 처음으로 돌아가기
            slider.style.transition = 'none'; // 인디케이터 없이 즉시 돌아가기
            slider.style.transform = `translateX(0)`;
        }

        setTimeout(() => {
            slider.style.transition = 'transform 15s ease'; // 슬라이드 이동 속도 조정 (기본값 3s)
            slider.style.transform = `translateX(-${(index * itemWidth)}px)`;
        }, 300); // 잠시 멈추는 시간 (0.1초)
    }

    // 자동 슬라이드 시작
    const slideInterval = setInterval(autoSlide, 6000); // 슬라이드 간격을 6초로 설정 (속도 3배 느리게)

    // 마우스가 슬라이더에 들어오면 자동 슬라이드 멈추기
    slider.addEventListener('mouseover', stopAutoSlide);

    // 마우스가 슬라이더를 떠나면 자동 슬라이드 다시 시작
    slider.addEventListener('mouseout', startAutoSlide);

    // 초기 설정
    slider.style.transform = `translateX(0)`;
});
