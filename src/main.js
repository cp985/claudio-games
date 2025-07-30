import "./style/general.css";
import "./style/normalizeCss.css";
import "./services/api.js";
import "./style/resetcss.css";
import "./style/body.background.css";

window.addEventListener("load", () => {
  console.log(
    "Finestra completamente caricata, inclusi tutti gli stili e le immagini"
  );

  // Aggiungiamo un ulteriore ritardo per sicurezza
  setTimeout(() => {
    import(/* webpackChunkName: "carousel" */ "./services/carousel-hero.js")
      .then((module) => {
        console.log("Modulo carosello caricato");
        if (module.default && typeof module.default === "function") {
          module.default();
        } else {
          console.error("Funzione carosello non trovata nel modulo");
        }
      })
      .catch((error) => {
        console.error("Errore nel caricamento del carosello:", error);
      });
  }, 100);
});

if (module.hot) {
  module.hot.accept();
}

console.log("hello");

//#region dom const

//#endregion dom const

//#region dom handler

//#endregion dom handler
