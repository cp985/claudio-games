//#region dom const

//#endregion dom const

//#region dom handler

export default function nextSlide() {
 const slide = document.querySelectorAll(".slide");
  let slideActive = 0;
  slide[0].classList.add("active");

  slideActive++;
  function slideActiveHandler() {
    slide[slideActive].classList.remove("active");
    slideActive++;
    if (slideActive >= slide.length) {
      slideActive = 0;
    }
    slide[slideActive].classList.add("active");
  }
  setInterval(slideActiveHandler, 5000);
}

//#endregion dom handler
