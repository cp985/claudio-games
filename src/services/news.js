// File: services/news.js

import axios from "axios";

/**
 * Funzione per recuperare le notizie sui giochi da un'API esterna
 * e mostrarle nella sezione .mNews della pagina.
 */
export function newsApiCall() {
  const originalUrl = "https://www.freetogame.com/api/games";
  // Usiamo un proxy CORS per evitare problemi di policy del browser
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    originalUrl
  )}`;

  axios
    .get(proxyUrl)
    .then((response) => response.data) // Estrae i dati dalla risposta di Axios
    .then((allGames) => {
      // --- PUNTO CHIAVE 1: Gestione sicura dei dati ricevuti ---

      // Controlla se i dati ricevuti sono un array valido e non vuoto.
      // Questo previene errori se l'API o il proxy falliscono.
      if (!Array.isArray(allGames) || allGames.length === 0) {
        console.error("Dati non validi o vuoti ricevuti dall'API. Interruzione.");
        // Restituisce un array vuoto per evitare di rompere la catena .then()
        return []; 
      }

      // --- PUNTO CHIAVE 2: Selezione casuale robusta ---

      // Mescola l'array completo in modo casuale e prendi i primi 6 elementi.
      // Questo metodo è sicuro e non produce mai 'undefined'.
      const shuffled = [...allGames].sort(() => 0.5 - Math.random());
      const randomGames = shuffled.slice(0, 6);

      return randomGames; // Passa i 6 giochi unici al prossimo .then()
    })
    .then((arrNews) => {
      // --- PUNTO CHIAVE 3: Interazione sicura con il DOM ---
      
      // Seleziona il contenitore SOLO quando sei sicuro che esista
      const cont = document.querySelector(".mNews");

      // Controllo di sicurezza fondamentale: esci se il contenitore non è nel DOM
      if (!cont) {
        console.error("CRITICO: Elemento .mNews non trovato nel DOM! Impossibile mostrare le notizie.");
        return;
      }
      
      // Pulisce il contenitore da eventuali contenuti precedenti o segnaposto
      cont.innerHTML = '';

      // Ora puoi iterare sull'array sapendo che ogni 'game' è un oggetto valido
      arrNews.forEach((game) => {
        // Crea la stringa HTML per ogni articolo
        const articleHTML = `
          <article class="aNews">
            <h2 class="h2News">${game.title}</h2>
            <p class="pNews">${game.short_description}. The game was created by ${game.publisher}.</p>
            <figure class="figNews">
              <a href="${game.game_url}" target="_blank" rel="noopener noreferrer">
                <img class="imgNews" src="${game.thumbnail}" alt="Thumbnail for ${game.title}">
                <figcaption>${game.title}</figcaption>
              </a>
            </figure>
          </article>
        `;

        // Aggiunge l'articolo al contenitore
        cont.insertAdjacentHTML('beforeend', articleHTML);
      });
    })
    .catch((error) => {
      // Cattura qualsiasi errore che potrebbe verificarsi nella catena (rete, parsing, ecc.)
      console.error("Errore generale nel processo di fetching delle notizie:", error);
      
      // Potresti anche mostrare un messaggio di errore all'utente nel DOM
      const cont = document.querySelector(".mNews");
      if(cont) {
        cont.innerHTML = '<p class="error-message">Spiacenti, non è stato possibile caricare le notizie. Riprova più tardi.</p>';
      }
    });
}