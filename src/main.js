import "./style/general.css";
import "./style/normalizeCss.css";
import "./services/api.js";
import "./style/resetcss.css";
import "./style/body.background.css";

// window.addEventListener("DOMContentLoaded", () => {
//   console.log(
//     "Finestra completamente caricata, inclusi tutti gli stili e le immagini"
//   );

//   setTimeout(() => {
//     import(/*webpackChunkName: "carousel" */ "./services/carousel-hero.js")
//       .then((module) => {
//         console.log("Modulo carosello caricato");
//         if (module.default && typeof module.default === "function") {
//           module.default();
//         } else {
//           console.error("Funzione carosello non trovata nel modulo");
//         }
//       })
//       .catch((error) => {
//         console.error("Errore nel caricamento del carosello:", error);
//       });
//   }, 1000);
// });

function waitForCss(callback) {
  function check() {
    if (document.body.getAttribute('data-css-loaded') === 'true') {
      console.log('CSS caricati, procedo con il carosello');
      callback();
    } else {
      console.log('CSS non ancora caricati, attendo...');
      setTimeout(check, 100);
    }
  }
  
  // Inizia a controllare quando il DOM è pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', check);
  } else {
    check();
  }
}

// Usa la funzione di attesa prima di caricare il carosello
waitForCss(function() {
  console.log('Caricamento del carosello...');
  import(/* webpackChunkName: "carousel" */ './services/carousel-hero.js')
    .then(module => {
      console.log('Modulo carosello caricato');
      if (module.default && typeof module.default === 'function') {
        module.default();
      } else {
        console.error('Funzione carosello non trovata nel modulo');
      }
    })
    .catch(error => {
      console.error('Errore nel caricamento del carosello:', error);
    });
});

if (module.hot) {
  module.hot.accept();
}

console.log("hello");

//#region dom const

//#endregion dom const

//#region dom handler

//#endregion dom handler
