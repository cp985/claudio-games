// 1. Importa tutti gli stili necessari
import "./style/general.css";
import "./style/normalizeCss.css";
import "./style/resetcss.css";
import "./style/body.background.css";

// File: src/index.js (o il tuo file di entry point)

// --- INIZIO BLOCCO CORRETTO ---
// Definiamo il nome del repository qui per coerenza
const repoName = '/claudio-games';

// Controlla se c'è un reindirizzamento salvato dal 404.html
const redirect = sessionStorage.getItem('redirect');

// Se c'è, lo rimuoviamo per non usarlo più al prossimo refresh
if (redirect) {
  sessionStorage.removeItem('redirect');

  // CORREZIONE: Ricostruiamo l'URL COMPLETO prima di passarlo a history.
  // Uniamo il nome del repo con il percorso salvato.
  // Esempio: repoName ("/claudio-games") + redirect ("/news") = "/claudio-games/news"
  const fullPath = repoName + redirect;
  
  // Ora l'URL viene cambiato correttamente senza ricaricare la pagina
  history.replaceState(null, null, fullPath);
}



// 2. Importa la funzione per avviare il nostro router
import { startRouter } from "./services/page-route.js";

// 3. Avvia l'applicazione chiamando il router
startRouter();

console.log("Application initialized.");

// Mantiene la funzionalità di Hot Module Replacement per lo sviluppo
if (module.hot) {
  module.hot.accept();
}