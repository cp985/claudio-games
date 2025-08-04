import page from "page";

// --- 1. I TUOI IMPORT E LE TUE RISORSE ---
// (Assicurati che i percorsi siano corretti)
import { animateLogo, killLogoAnimations } from "./logo-h1.js";
import { initCarousel, destroyCarousel } from "./carousel-hero.js";
import imgSassoCartaForbice from "../../assets/img/sassocartaforbice.webp";
import imgComingSoon2 from "../../assets/img/coming-soon-2.webp";
import imgOrdinaLeParole from "../../assets/img/ordina-le-parole.webp";
import imgTrovaIlCodice from "../../assets/img/trovailcodice.webp";
import imgComingSoon from "../../assets/img/coming-soon.webp";
import imgProva from "../../assets/img/foto_panorami_06.jpg";

// --- 2. SELETTORI E TEMPLATE GLOBALI ---

// Il contenitore principale dove verranno renderizzate le pagine
const content = document.querySelector("#content");

// Template HTML per il loader, definito una sola volta
const loaderHTML = `<div class="loader-container"><div class="loader"><h1>Loading</h1></div></div>`;

// L'oggetto che contiene l'HTML di ogni pagina
const pageList = {
  home: `
    <div class="logo"><h1 id="animated-logo"></h1></div>
    <main class="swiper">
      <section class="hero-carousel swiper-wrapper">
        <figure class="slide swiper-slide"><a href="#"><img src="${imgSassoCartaForbice}" alt="..."><figcaption>...</figcaption></a></figure>
        <figure class="slide swiper-slide"><a href="#"><img src="${imgComingSoon2}" alt="..."><figcaption>...</figcaption></a></figure>
        <figure class="slide swiper-slide"><a href="#"><img src="${imgOrdinaLeParole}" alt="..."><figcaption>...</figcaption></a></figure>
        <figure class="slide swiper-slide"><a href="#"><img src="${imgTrovaIlCodice}" alt="..."><figcaption>...</figcaption></a></figure>
        <figure class="slide swiper-slide"><a href="#"><img src="${imgComingSoon}" alt="..."><figcaption>...</figcaption></a></figure>
      </section>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </main>
    `,
  news: `
    <h1 class="h1News">Ecco le ultime news dal mondo games..</h1>
    <main class="mNews">
      <article class="aNews">
        <p class="pNews">Testo di esempio per il primo articolo...</p>
        <figure class="figNews"><a href="#"><img class="imgNews" src="${imgProva}" alt="img prova"><figcaption>img prova</figcaption></a></figure>
      </article>
      <article class="aNews">
         <figure class="figNews"><a href="#"><img class="imgNews" src="${imgProva}" alt="img prova"><figcaption>img prova</figcaption></a></figure>
         <p class="pNews">Testo di esempio per il secondo articolo...</p>
      </article>
      <article class="aNews">
        <p class="pNews">Testo di esempio per il terzo articolo...</p>
        <figure class="figNews"><a href="#"><img class="imgNews" src="${imgProva}" alt="img prova"><figcaption>img prova</figcaption></a></figure>
      </article>
    </main>
  `,
  games: `<h1>Pagina dei Giochi</h1>`,
  contact: `<h1>Pagina dei Contatti</h1>`,
  ggg: `<h1>???</h1>`,
  "404": `<h1>404 - Pagina non trovata</h1>`
};

// --- 3. VARIABILI DI STATO E FUNZIONI HELPER ---

// Variabili per gestire lo stato della pagina attiva
let activeSwiper = null;
let isHomePage = false;

/**
 * Pulisce le risorse della pagina precedente (es. carosello, animazioni).
 * Questo è un middleware di page.js.
 */
function cleanup(context, next) {
  if (isHomePage) {
    destroyCarousel(activeSwiper);
    killLogoAnimations();
    activeSwiper = null;
    isHomePage = false;
  }
  next(); // Prosegui alla prossima funzione middleware o alla rotta
}

/**
 * Renderizza l'HTML di una pagina nel contenitore 'content'.
 * @param {string} pageId - La chiave dell'HTML da renderizzare (es. "home", "news").
 * @param {Function} [onRenderedCallback] - Funzione opzionale da eseguire dopo il rendering.
 */
function renderPage(pageId, onRenderedCallback) {
  content.innerHTML = pageList[pageId] || pageList["404"];
  if (onRenderedCallback) {
    onRenderedCallback();
  }
}

/**
 * Funzione centralizzata che mostra il loader e poi renderizza la pagina.
 * @param {string} pageId - La chiave della pagina da mostrare.
 * @param {Function} [onRenderedCallback] - Callback opzionale per la logica post-rendering.
 */
function showLoaderAndRender(pageId, onRenderedCallback) {
  content.innerHTML = loaderHTML;
  setTimeout(() => {
    renderPage(pageId, onRenderedCallback);
  }, 300); // Puoi cambiare la durata del loader qui, in un unico posto
}

// --- 4. LA FUNZIONE PRINCIPALE DEL ROUTER ---

export function startRouter() {
  // Imposta la base URL, se necessario
  page.base(__BASE_URL__);
  // page.base('/claudio-games');
  // Middleware globale per la pulizia, eseguito ad ogni cambio di rotta
  page("*", cleanup);

  // Definizione delle rotte, ora molto più pulita
  page("/", () => {
    showLoaderAndRender("home", () => {
      // Logica specifica da eseguire *dopo* che la home è stata renderizzata
      isHomePage = true;
      animateLogo();
      activeSwiper = initCarousel();
    });
  });

  page("/news",    () => showLoaderAndRender("news"));
  page("/games",   () => showLoaderAndRender("games"));
  page("/contact", () => showLoaderAndRender("contact"));
  page("/ggg",      () => showLoaderAndRender("ggg"));

  // Rotte segnaposto (puoi integrarle in pageList se diventano complesse)
  page("/sasso-carta-forbice", () => showLoaderAndRender("sasso-carta-forbice"));
  page("/ordina-le-parole",    () => showLoaderAndRender("ordina-le-parole"));
  page("/trova-il-codice",     () => showLoaderAndRender("trova-il-codice"));
  // (Dovrai aggiungere "sasso-carta-forbice" etc. all'oggetto pageList)

  // Rotta catch-all per le pagine non trovate (404)
  // Non usa il loader, mostra subito l'errore.
  page("*", () => renderPage("404"));

  // Avvia il router
  page.start();
}