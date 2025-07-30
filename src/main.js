import "./style/general.css";
import "./style/normalizeCss.css";
import "./style/resetcss.css";
import "./style/body.background.css";

window.onload = async function loadCarousel() {
  try {
    const modulo = await import("../src/services/carousel-hero.js");
    console.log("Modulo carosello caricato");
    if (modulo.default) {
      modulo.default();
    } else {
      console.error("Funzione carosello non trovata nel modulo");
    }
  } catch (error) {
    console.error("Errore nel caricamento del carosello:", error);
  }
};


if (module.hot) {
  module.hot.accept();
}

//#region dom const

//#endregion dom const

//#region dom handler

//#endregion dom handler
