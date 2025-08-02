import page from "page";
import { animateLogo, killLogoAnimations } from "./logo-h1.js";
import { initCarousel, destroyCarousel } from "./carousel-hero.js";

// =========================================================================
// ==================== INIZIO MODIFICHE FONDAMENTALI ======================
// =========================================================================

// 1. IMPORTA TUTTE LE IMMAGINI NECESSARIE DALLA LORO POSIZIONE REALE
//    Assicurati che il percorso relativo '../assets/img/...' sia corretto.
//    Se questo file è in /src e le immagini in /assets, questo percorso è sbagliato.
//    Probabilmente devi usare './assets/img/...' se 'assets' è dentro 'src',
//    o '../assets/img/...' se 'assets' è fuori da 'src'.
//    **CONTROLLA QUESTO PERCORSO CON ATTENZIONE!**

import imgSassoCartaForbice from "../../assets/img/sassocartaforbice.webp";
import imgComingSoon2 from "../../assets/img/coming-soon-2.webp";
import imgOrdinaLeParole from "../../assets/img/ordina-le-parole.webp";
import imgTrovaIlCodice from "../../assets/img/trovailcodice.webp";
import imgComingSoon from "../../assets/img/coming-soon.webp";

// =========================================================================
// ===================== FINE MODIFICHE FONDAMENTALI =======================
// =========================================================================

page.base("/claudio-games");
const content = document.querySelector("#content");

// L'HTML delle tue pagine
const pageList = {
  home: `
        <div class="logo">
          <h1 id="animated-logo"></h1>
        </div>
        <main class="swiper">
          <section class="hero-carousel swiper-wrapper">
            <!-- 2. USA LE VARIABILI IMPORTATE NEI PERCORSI DELLE IMMAGINI -->
            <figure class="slide swiper-slide"><a href="/claudio-games/sasso-carta-forbice"><img src="${imgSassoCartaForbice}" alt="sasso carta e forbice"><figcaption>Prova a battere il gioco..</figcaption></a></figure>
            <figure class="slide swiper-slide"><a href="#"><img src="${imgComingSoon2}" alt="Grosse novità in arrivo"><figcaption>Novità in arrivo..</figcaption></a></figure>
            <figure class="slide swiper-slide"><a href="/claudio-games/ordina-le-parole"><img src="${imgOrdinaLeParole}" alt="gioco ordina le parole"><figcaption>Combatti fino all'ultima sillaba..</figcaption></a></figure>
            <figure class="slide swiper-slide"><a href="/claudio-games/trova-il-codice"><img src="${imgTrovaIlCodice}" alt="gioco trova la combinazione"><figcaption>Indovina la combinazione ed apri il baule..</figcaption></a></figure>
            <figure class="slide swiper-slide"><a href="#"><img src="${imgComingSoon}" alt="presto in arrivo nuovi giochi"><figcaption>Rimanete aggiornati per nuovi arrivi</figcaption></a></figure>
          </section>
          <div class="swiper-pagination" id="bulletHeroBanner"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </main>
    `,
  news: `<h1 class="news-title">Ecco le ultime news dal mondo games..</h1><main class="news-content"></main>`,
  games: `<h1>Games</h1><main class="news-content"></main>`,
  contact: `<h1>Contatti</h1><main class="news-content"></main>`,
  ggg: `<h1>???</h1><main class="news-content"></main>`,
};

let activeSwiper = null;
let isHomePage = false;

function cleanup(context, next) {
  console.log("Router: Cleaning up previous page...");
  if (isHomePage) {
    destroyCarousel(activeSwiper);
    killLogoAnimations();
    activeSwiper = null;
    isHomePage = false;
  }
  next();
}

function renderPage(pageId, onRendered) {
  content.innerHTML = pageList[pageId] || "<h1>Pagina non trovata</h1>";
  console.log(`Router: Rendered page '${pageId}'.`);
  if (onRendered) {
    onRendered();
  }
}

// ROUTING
page("*", cleanup);

page("/", () => {
  renderPage("home", () => {
    isHomePage = true;
    animateLogo();
    activeSwiper = initCarousel();
  });
});

page("/news", () => renderPage("news"));
page("/games", () => renderPage("games"));
page("/contact", () => renderPage("contact"));
page("/ggg", () => renderPage("ggg"));

// Rimosso il redirect catch-all per ora, può causare loop.
// Aggiungiamo una pagina 404 gestita.
page("*", () => renderPage("404")); // Mostra una pagina 404 se nessuna rotta corrisponde

export function startRouter() {
  console.log("startRouter EXECUTED!");
  // Non hai più bisogno della logica di redirect qui,
  // il sistema 404.html -> main.js -> page.js è ora sufficiente.
  page.start();
}../