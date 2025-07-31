import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

/**
 * Inizializza Swiper e restituisce la sua istanza.
 * @returns {Swiper|null} L'istanza di Swiper o null se l'elemento non esiste.
 */
export function initCarousel() {
  const swiperEl = document.querySelector(".swiper");
  if (swiperEl) {
    console.log("Carousel: Initializing Swiper.");
    return new Swiper(swiperEl, {
      modules: [Navigation, Pagination, Autoplay, EffectFade],
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      speed:1500,
      effect: "fade",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
  return null;
}

/**
 * Distrugge un'istanza di Swiper per pulire la memoria e gli eventi.
 * @param {Swiper} swiperInstance L'istanza di Swiper da distruggere.
 */
export function destroyCarousel(swiperInstance) {
  if (swiperInstance && !swiperInstance.destroyed) {
    console.log("Carousel: Destroying Swiper instance.");
    swiperInstance.destroy(true, true);
  }
}