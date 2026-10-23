/* =====================================================
   main.js : 메인 페이지 전용 기능 - 메인 배너 관련 동작
   ===================================================== */

(() => {
  // 1. 이벤트 대상 : 메인 배너 이미지 (.main-visual-img)
  const 너를클릭해 = document.querySelector(".main-visual-img");
  // 2. 변경 대상 : 상단영역 (.top-area)
  const 나야나 = document.querySelector(".top-area");

  // 메인 배너가 없는 페이지에서는 실행하지 않음
  if (!너를클릭해 || !나야나) return;

  // 상단영역 배경색을 바꾸고 로고를 360도 회전시키는 함수
  const 나야나함수 = (색상) => {
    나야나.style.backgroundColor = 색상;
    나야나.style.transition = "2s ease-in-out";
    // 회전은 로고가 함
    const 로고 = 나야나.querySelector(".logo-box");
    로고.style.rotate = "360deg";
    // 로고 트랜지션 : 2초후 1초간 ease-in-out
    로고.style.transition = "1s ease-in-out 2s";
  };

  // 클릭이벤트 (원본에서도 주석처리 되어 있어 동작하지 않음)
  // 너를클릭해.onclick = () => {
  //   나야나함수("orange");
  // };
})();
