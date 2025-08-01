
import page from "page";
import { animateLogo, killLogoAnimations } from "./logo-h1.js"; 
import { initCarousel, destroyCarousel } from "./carousel-hero.js";

const content = document.querySelector("#content");

// L'HTML delle tue pagine
const pageList = {
    home: `
        <div class="logo">
          <h1 id="animated-logo"></h1>
        </div>
        <main class="swiper">
          <section class="hero-carousel swiper-wrapper">
            <figure class="slide swiper-slide"><img src="img/sassocartaforbice.webp" alt="sasso carta e forbice"><figcaption>Prova a battere il gioco..</figcaption></figure>
            <figure class="slide swiper-slide"><img src="img/coming-soon-2.webp" alt="Grosse novità in arrivo"><figcaption>Novità in arrivo..</figcaption></figure>
            <figure class="slide swiper-slide"><img src="img/ordina-le-parole.webp" alt="gioco ordina le parole"><figcaption>Combatti fino all'ultima sillaba..</figcaption></figure>
            <figure class="slide swiper-slide"><img src="img/trovailcodice.webp" alt="gioco trova la combinazione"><figcaption>Indovina la combinazione ed apri il baule..</figcaption></figure>
            <figure class="slide swiper-slide"><img src="img/coming-soon.webp" alt="presto in arrivo nuovi giochi"><figcaption>Rimanete aggiornati per nuovi arrivi</figcaption></figure>
          </section>
          <input type="checkbox" name="left" id="left"><label for="left" id="leftL" class="swiper-button-prev"></label>
          <input type="checkbox" name="right" id="right"><label for="right" id="rightL" class="swiper-button-next"></label>
          <div class="swiper-pagination" id="bulletHeroBanner"></div>
        </main>
    `,
    news: `<h1 class="news-title">Ecco le ultime news dal mondo games..</h1><main class="news-content"></main>`,
    games: `<h1>Games</h1><main class="news-content"></main>`,
    contact: `<h1>Contatti</h1><main class="news-content"></main>`,
    ggg: `<h1>???</h1><main class="news-content"></main>`,
};

let activeSwiper = null;
let isHomePage = false;

/**
 * Pulisce i componenti della pagina precedente.
 * Viene chiamato da page.js prima di eseguire una nuova rotta.
 */
function cleanup(context, next) {
  console.log("Router: Cleaning up previous page...");
  if (isHomePage) {
    destroyCarousel(activeSwiper);
    killLogoAnimations();
    activeSwiper = null;
    isHomePage = false;
  }
  next(); // Prosegui con la prossima funzione (il caricamento della rotta)
}

/**
 * Funzione per renderizzare una pagina.
 */
function renderPage(pageId, onRendered) {
  content.innerHTML = pageList[pageId] || "<h1>Pagina non trovata</h1>";
  console.log(`Router: Rendered page '${pageId}'.`);
  // Esegui la funzione di inizializzazione, se esiste
  if (onRendered) {
    onRendered();
  }
}

// ROUTING
// Usiamo cleanup come "middleware" che viene eseguito per OGNI cambio di rotta.
page('*', cleanup);

page("/", () => {
  renderPage("home", () => {
    isHomePage = true; // Segna che siamo sulla home
    animateLogo();
    activeSwiper = initCarousel();
  });
});


page("/news", () => renderPage("news"));
page("/games", () => renderPage("games"));
page("/contact", () => renderPage("contact"));
page("/ggg", () => renderPage("ggg"));
page('*', () => page.redirect('/'));


// In services/page-route.js
export function startRouter() {
  const redirectPath = sessionStorage.redirect;
  if (redirectPath) {
    delete sessionStorage.redirect;
    window.history.replaceState(null, '', redirectPath);
  }
  page.start();
}