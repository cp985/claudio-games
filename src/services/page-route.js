// File: src/services/page-route.js (Versione finale corretta)

import page from "page";
import { animateLogo, killLogoAnimations } from "./logo-h1.js";
import { initCarousel, destroyCarousel } from "./carousel-hero.js";

import imgSassoCartaForbice from "../../assets/img/sassocartaforbice.webp";
import imgComingSoon2 from "../../assets/img/coming-soon-2.webp";
import imgOrdinaLeParole from "../../assets/img/ordina-le-parole.webp";
import imgTrovaIlCodice from "../../assets/img/trovailcodice.webp";
import imgComingSoon from "../../assets/img/coming-soon.webp";

const content = document.querySelector("#content");
const loaderHTML = `<div class="loader-container"><div class="loader"></div></div>`;

// I link ora sono relativi, page.js gestirà il prefisso __BASE_URL__
const pageList = {
  home: `
    <div class="logo"><h1 id="animated-logo"></h1></div>
    <main class="swiper">
      <section class="hero-carousel swiper-wrapper">
        <figure class="slide swiper-slide"><a href="/sasso-carta-forbice"><img src="${imgSassoCartaForbice}" alt="..."><figcaption>...</figcaption></a></figure>
        <figure class="slide swiper-slide"><a href="#"><img src="${imgComingSoon2}" alt="..."><figcaption>...</figcaption></a></figure>
        <figure class="slide swiper-slide"><a href="/ordina-le-parole"><img src="${imgOrdinaLeParole}" alt="..."><figcaption>...</figcaption></a></figure>
        <figure class="slide swiper-slide"><a href="/trova-il-codice"><img src="${imgTrovaIlCodice}" alt="..."><figcaption>...</figcaption></a></figure>
        <figure class="slide swiper-slide"><a href="#"><img src="${imgComingSoon}" alt="..."><figcaption>...</figcaption></a></figure>
      </section>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </main>
    `,
  news: `<h1 class="news-title">Ecco le ultime news dal mondo games..</h1>`,
  games: `<h1>Games</h1>`,
  contact: `<h1>Contatti</h1>`,
  ggg: `<h1>???</h1>`,
};

// Logica per pulire e renderizzare le pagine
let activeSwiper = null;
let isHomePage = false;

function cleanup(context, next) {
  if (isHomePage) {
    destroyCarousel(activeSwiper);
    killLogoAnimations();
    activeSwiper = null;
    isHomePage = false;
  }
  next();
}

function renderPage(pageId, onRendered) {
  content.innerHTML = pageList[pageId] || pageList["404"];
  if (onRendered) onRendered();
}

// La funzione di avvio che contiene tutta la logica del router
export function startRouter() {
  page.base(__BASE_URL__);

  page("*", cleanup);

  page("/", () => {
    renderPage("home", () => {
      isHomePage = true;
      animateLogo();
      activeSwiper = initCarousel();
    });
  });

  page("/news", () => { content.innerHTML = loaderHTML; setTimeout(() => renderPage("news"), 300); });
  page("/games", () => { content.innerHTML = loaderHTML; setTimeout(() => renderPage("games"), 300); });
  page("/contact", () => { content.innerHTML = loaderHTML; setTimeout(() => renderPage("contact"), 300); });
  page("/ggg", () => { content.innerHTML = loaderHTML; setTimeout(() => renderPage("ggg"), 300); });

  // Rotte segnaposto per i giochi
  page("/sasso-carta-forbice", () => content.innerHTML = "<h1>Gioco Sasso Carta Forbice</h1>");
  page("/ordina-le-parole", () => content.innerHTML = "<h1>Gioco Ordina le Parole</h1>");
  page("/trova-il-codice", () => content.innerHTML = "<h1>Gioco Trova il Codice</h1>");

  page("*", () => renderPage("404"));

  page.start();
}