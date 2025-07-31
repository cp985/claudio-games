// 1. Importa tutti gli stili necessari
import "./style/general.css";
import "./style/normalizeCss.css";
import "./style/resetcss.css";
import "./style/body.background.css";

// 2. Importa la funzione per avviare il nostro router
import { startRouter } from "./services/page-route.js";

// 3. Avvia l'applicazione chiamando il router
startRouter();

console.log("Application initialized.");

// Mantiene la funzionalità di Hot Module Replacement per lo sviluppo
if (module.hot) {
  module.hot.accept();
}