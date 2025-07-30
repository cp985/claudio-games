import "./style/general.css";
import "./style/normalizeCss.css";
import "./services/api.js";
import "./style/resetcss.css";
import "./style/body.background.css";

document.addEventListener("DOMContentLoaded", () => {
import(/* webpackChunkName: "carousel" */ './services/carousel-hero.js')
  .then(module => {
    console.log("Modulo:", module);
    if (module.default) {
      module.default();
    } else {
      console.error("nextSlide non trovata nel modulo");
    }
  });
})



if (module.hot) {
  module.hot.accept();
}

console.log("hello");

//#region dom const

// const slide = document.querySelectorAll(".slide");

//#endregion dom const

//#region dom handler
// let slideActive = 0;

// slide[0].classList.add("active");

// function nextSlide() {
//  slide[slideActive].classList.remove("active");
// slideActive++;
// if (slideActive >= slide.length) {
//     slideActive = 0;
//   }
// slide[slideActive].classList.add("active");

// }

// setInterval(nextSlide, 5000);

//#endregion dom handler
