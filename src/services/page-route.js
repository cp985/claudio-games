import page from "page";


import { animateLogo, killLogoAnimations } from "./logo-h1.js";
import { initCarousel, destroyCarousel } from "./carousel-hero.js";
import imgSassoCartaForbice from "../../assets/img/sassocartaforbice.webp";
import imgComingSoon2 from "../../assets/img/coming-soon-2.webp";
import imgOrdinaLeParole from "../../assets/img/ordina-le-parole.webp";
import imgTrovaIlCodice from "../../assets/img/trovailcodice.webp";
import imgComingSoon from "../../assets/img/coming-soon.webp";
import imgProva from "../../assets/img/foto_panorami_06.jpg";
import { newsApiCall } from "../services/news.js";


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
    <main class="mNews">
      <h2 class="h2News" >
      <span>C</span>
      <span>a</span>
      <span>r</span>
      <span>i</span>
      <span>c</span>
      <span>a</span>
      <span>m</span>
      <span>e</span>
      <span>n</span>
      <span>t</span>
      <span>o</span>
      <span>&nbsp;</span>
      <span>i</span>
      <span>n</span>
      <span>&nbsp;</span>
      <span>c</span>
      <span>o</span>
      <span>r</span>
      <span>s</span>
      <span>o</span>
      <span>.</span>
      <span>.</span>
      <span>.</span></h2>
    </main>
  `,
  games: `<h1>Pagina dei Giochi</h1>`,
  contact: `
  <main class="contact-page">
    <div class="cont-contact">
     <section class="form-contact-section">
       <h2>Contattaci</h2>
       <form name="form" id="form" action="/">
         <fieldset>
           <legend>Compila il modulo</legend>
           <div class="input-wrapper">
       <label for="name">Nome:
          <input id="name" type="text" required="required">
          </label>
          <label for="last-name">Cognome:
         <input id="last-name" type="text" required="required">
          </label>
          <label for="email">E-mail:
         <input type="email" id="email" required="required">
          </label>
          </div>
          </fieldset>
        <label for="textarea" >Inserisci il tuo messaggio:
          <textarea name="textarea" id="textarea" placeholder="Scrivi qui..." required="required"></textarea>
        </label>
          <button type="submit" id="button-submit">Invia</button>
       </form>
      </section>
       
      <section class="contact-info-section">
        <h2>Dove Siamo</h2>
        <div class="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28185.491249175324!2d86.90476692418683!3d27.98819281230523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e854a215bd9ebd%3A0x576dcf806abbab2!2sMonte%20Everest!5e0!3m2!1sit!2sit!4v1754488279983!5m2!1sit!2sit" 
            style="border:0;" 
            width="100%"
            height="100%"
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div class="address-info">
          <h3>Il nostro Quartier Generale (Fittizio)</h3>
          <p>Monte Everest(in cima!) <br> Nepal </p>
          <p><strong>Email:</strong> <a href="#">info@claudiogames.com</a></p>
          <p><strong>Telefono:</strong> <a href="#">+977 98 1234 5678</a></p>
        </div>
      </section>
      
    </div>
  </main>
  `,
  ggg: `<h1>???</h1>`,
  404: `<h1>404 - Pagina non trovata</h1>`,
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
  }, 500); // Puoi cambiare la durata del loader qui, in un unico posto
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

  page("/news", () => showLoaderAndRender("news", () => newsApiCall()));
  page("/games", () => showLoaderAndRender("games"));
  page("/contact", () => showLoaderAndRender("contact"));
  page("/ggg", () => showLoaderAndRender("ggg"));

  // Rotte segnaposto (puoi integrarle in pageList se diventano complesse)
  page("/sasso-carta-forbice", () =>
    showLoaderAndRender("sasso-carta-forbice")
  );
  page("/ordina-le-parole", () => showLoaderAndRender("ordina-le-parole"));
  page("/trova-il-codice", () => showLoaderAndRender("trova-il-codice"));
  // (Dovrai aggiungere "sasso-carta-forbice" etc. all'oggetto pageList)

  // Rotta catch-all per le pagine non trovate (404)
  // Non usa il loader, mostra subito l'errore.
  page("*", () => renderPage("404"));

  // Avvia il router
  page.start();
}
