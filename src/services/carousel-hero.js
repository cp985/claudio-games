// #region swiper carousel slider auto + button

//swiper carousel
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination, Autoplay, EffectFade],

  // Configurazione base
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,

  // Autoplay (opzionale)
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  // Effetto di transizione
  effect: "fade",

  // Bottoni di navigazione
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Paginazione (opzionale)
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// #endregion swiper slide auto + button
