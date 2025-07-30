import "./style/general.css";
import "./style/normalizeCss.css";
import "./services/api.js";
import "./style/resetcss.css";
import "./style/body.background.css";

if (module.hot) {
  module.hot.accept();
}

console.log("hello");

//#region dom const

const slide = document.querySelectorAll(".slide");

//#endregion dom const

//#region dom handler
let slideActive = 0;

slide[0].classList.add("active");

function nextSlide() {
 slide[slideActive].classList.remove("active");
slideActive++;
if (slideActive >= slide.length) {
    slideActive = 0;
  }
slide[slideActive].classList.add("active");

}


setInterval(nextSlide, 5000);

//#endregion dom handler
