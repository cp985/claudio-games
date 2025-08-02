// 1. Importa tutti gli stili necessari
import "./style/general.css";
import "./style/normalizeCss.css";
import "./style/resetcss.css";
import "./style/body.background.css";


// Controlla se c'è un reindirizzamento salvato dal 404.html
const redirect = sessionStorage.getItem('redirect');
// Se c'è, lo rimuoviamo per non usarlo più al prossimo refresh
if (redirect) {
  sessionStorage.removeItem('redirect');
  // E usiamo l'History API per cambiare l'URL nella barra degli indirizzi
  // senza ricaricare la pagina. Il tuo router vedrà questo nuovo percorso.
  history.replaceState(null, null, redirect);
}
// --- FINE BLOCCO DA AGGIUNGERE ---

// Qui sotto ci sarà il resto del tuo codice, ad esempio:
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
// 2. Importa la funzione per avviare il nostro router
import { startRouter } from "./services/page-route.js";

// 3. Avvia l'applicazione chiamando il router
startRouter();

console.log("Application initialized.");

// Mantiene la funzionalità di Hot Module Replacement per lo sviluppo
if (module.hot) {
  module.hot.accept();
}