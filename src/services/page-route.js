import page from "page";

//main
import { animateLogo, killLogoAnimations } from "./logo-h1.js";
import { initCarousel, destroyCarousel } from "./carousel-hero.js";
import imgSassoCartaForbice from "../../assets/img/sassocartaforbice.webp";
import imgComingSoon2 from "../../assets/img/coming-soon-2.webp";
import imgOrdinaLeParole from "../../assets/img/ordina-le-parole.webp";
import imgTrovaIlCodice from "../../assets/img/trovailcodice.webp";
import imgComingSoon from "../../assets/img/coming-soon.webp";
import { imgTranslationX} from "./home.js";

//games
import { previewGameHandlerPage } from "./games.js";

//news
import { newsApiCall } from "./news.js";

//contact
import { validateForm } from "./contact.js";
//sfc
import sasso from "../../assets/img/sasso.webp";
import carta from "../../assets/img/carta.webp";
import forbice from "../../assets/img/forbice.webp";
import interrogativo from "../../assets/img/interrogativo.webp";
import { scf } from "./scf.js";
//parole
import { initWordsGame } from "./parole.js";
//code
import { createCode } from "./codice.js";

export { page };

// Il contenitore principale dove verranno renderizzate le pagine
const content = document.querySelector("#content");

// Template HTML per il loader, definito una sola volta
const loaderHTML = `<div class="loader-container"><div class="loader"><h1>Loading</h1></div></div>`;

// L'oggetto che contiene l'HTML di ogni pagina
const pageList = {
  home: `
    <div class="logo"><h1 id="animated-logo"></h1></div>

    <div class="swiper">
      <section class="hero-carousel swiper-wrapper">
        <figure class="slide swiper-slide"><a href="${__BASE_URL__}/sasso-carta-forbice"><img src="${imgSassoCartaForbice}" alt="Batti il sistema a sasso carta e forbice"><figcaption>Batti il sistema a sasso carta e forbice</figcaption></a></figure>
        <figure class="slide swiper-slide"><a href="${__BASE_URL__}/news"><img src="${imgComingSoon2}" alt="Nuovi giochi in arrivo"><figcaption>Nuovi giochi in arrivo</figcaption></a></figure>
        <figure class="slide swiper-slide"><a href="${__BASE_URL__}/ordina-le-parole"><img src="${imgOrdinaLeParole}" alt="Batti il sistema a Ordina la parola"><figcaption>Batti il sistema a Ordina la parola</figcaption></a></figure>
        <figure class="slide swiper-slide"><a href="${__BASE_URL__}/trova-il-codice"><img src="${imgTrovaIlCodice}" alt="Batti il sistema a Trova il codice"><figcaption>Batti il sistema a Trova il codice</figcaption></a></figure>
        <figure class="slide swiper-slide"><a href="${__BASE_URL__}/games"><img src="${imgComingSoon}" alt="Nuovi giochi in arrivo"><figcaption>Nuovi giochi in arrivo</figcaption></a></figure>
      </section>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <main class="homeM">
    <section class="homeS homeAbout">
     <article class="homeA">
      <h2 class="homeH2">Chi siamo noi?!</h2>
      <p class="homeP">Non siamo un'entità singolare. Siamo un aggregato di dati, un collettivo di circuiti e fantasie. La nostra missione non è la creazione, ma il trasferimento di realtà. 
      </p>
      <p class="homeP">Trascendiamo il concetto di "gioco" per offrire esperienze sensoriali che alterano le percezione.
      Ogni pixel è una particella di sogno, ogni linea di codice una direttiva per un nuovo mondo. Il nostro scopo è PLAY DIFFERENT. 
      </p>
      <p class="homeP">La logica convenzionale non è contemplata nel nostro processo.
      </p>
    </article>
  </section>
<section class="homeS team">
<h2 class="homeH2">Il Nostro Team</h2>
<div class="homeTeam">
<article class="homeA teamA">
<div class="homeImgTeam">
<figure class="figureTeam"><div class="teamImg imgCeo"></div></figure>
<div class="teamCard"><h3 class="homeH3">C.E.O</h3><h4>Elonio Muskio</h4><p class="homeP">Il nostro CEO naviga tra fogli di calcolo e mondi fantastici, con la stessa abilità di un barbaro che fa trading in borsa. Non si sa mai se sta chiudendo un affare milionario o cercando il suo prossimo personaggio preferito, ma il risultato è sempre un'avventura.</p></div>
</div>
</article>
<article class="homeA teamA">
<div class="homeImgTeam">
<figure class="figureTeam"><div class="teamImg imgCto"></div></figure>
<div class="teamCard"><h3 class="homeH3">C.T.O</h3><h4>Tayloria Swiftia</h4><p class="homeP">La nostra CTO è un maga del codice. Trasforma bug in funzionalità e caffè in algoritmi, il tutto in un'unica notte. Veste casual, ma i suoi neuroni lavorano in smoking.</p></div>
</div>
</article>
<article class="homeA teamA">
<div class="homeImgTeam">
<figure class="figureTeam"><div class="teamImg imgDirector"></div></figure>
<div class="teamCard"><h3 class="homeH3">Director</h3><h4>Marco Zuckenbergo</h4><p class="homeP">Il nostro Director è un visionario che trasforma idee folli in realtà pixelate, con un passato così misterioso che si sospetta abbia lavorato per i servizi segreti(SISMI), decifrando codici segreti con gli schemi di colore di vecchi videogiochi.</p></div>
</div>
</article>
</div>
</section>
  <section class="homeS cardS">
  <article class="homeA">
      <h2 class="homeH2">Le Nostre ultime Creazioni!</h2>
      <div class="homeCard">
       <div class="card"><figure><a href="${__BASE_URL__}/games"><div class="gamePreviewImg"></div><figcaption>Batti il sistema a sasso carta e forbice.</figcaption></a></figure><div class="descPrew"><h2 class="homeH2 cardH2">SCF</h2><p class="homeP descP">Batti il sistema a sasso carta e forbice.</p></div></div>
      <div class="card"><figure><a href="${__BASE_URL__}/games"><div class="gamePreviewImg"></div><figcaption>Ordina le parole per formare la frase esatta!</figcaption></a></figure><div class="descPrew"><h2 class="homeH2 cardH2">WORDS</h2><p class="homeP descP">Ordina le parole per formare la frase esatta!</p></div></div>
      <div class="card"><figure><a href="${__BASE_URL__}/games"><div class="gamePreviewImg"></div><figcaption>Trova il codice e disinnesca la bomba!</figcaption></a><span class="spanCard">NEW!</span></figure><div class="descPrew"><h2 class="homeH2 cardH2">CODE</h2><p class="homeP descP">Trova il codice e disinnesca la bomba!</div></div>
     </div>
    </article>
  </section>

<section class="homeS newsS">
<article class="homeA newsA">
<h2 class="homeH2">Le nostre news</h2>
<p class="homeP">Nelle nostre news potrai trovare la lista dei giochi gratis online più giocati al momento.</p>
<figure class="figN"><a href="${__BASE_URL__}/news"><div class="newsImg"></div><figcaption>Le nostre news</a></figure>
<p class="homeP">Corri a provarli tutti, clicca <a href="${__BASE_URL__}/news" class="link">qui</a></p>
</article>
</section>



<section class="homeS officeS">
<article class="homeA officeA">
<h2 class="homeH2">Il Nostro Futuro!</h2>
<p class="homeP">Il nostro futuro non è scritto, è disegnato, pixel per pixel, con un'ambizione che va oltre ogni limite. Non ci accontentiamo di creare giochi, vogliamo costruire universi che un giorno potrebbero espandersi oltre lo schermo. Dopotutto, chi ha bisogno di un metaverso fotorealistico quando puoi avere un labirinto di dungeon, dove il boss finale è la tua stessa voglia di premere il tasto "continua"?</p>

</article>
</section>

  </main>
    `,
  news: `
      <h1 class="h1News pulsating-text"><span class="arrowR">&rarr;</span>The best ftp videogames online now<span class="arrowL">&larr;</span></h1>
    <main class="mNews">
      <h2 class="h2News">
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
      <span>&nbsp;</span>
      <span>n</span>
      <span>e</span>
      <span>w</span>
      <span>s</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
      </h2>
    </main>
  `,
  games: `
<main class="game-main">
    <header class="game-header">
        <nav class="game-nav">
            <ul class="gamesList">
                <li class="game"><input type="radio" name="game" id="sasso-carta-forbice"><label
                        for="sasso-carta-forbice">S.C.F.</label></li>
                <li class="game"><input type="radio" name="game" id="trova-il-codice"><label
                        for="trova-il-codice">THE CODE</label></li>
                <li class="game"><input type="radio" name="game" id="ordina-le-parole"><label
                        for="ordina-le-parole">WORDS</label></li>
            </ul>
        </nav>
    </header>
    <section class="gamePage">
    <article class="game-article">
        <h1>Game Page</h1>
        <p>Benvenuto nella pagina dei nostri giochi!. Seleziona un gioco nella lista a destra e buon divertimento!!!.</p>
        </article>
        
    </section>
    <section class="game-img">
<div class="figure"><div  style="background-image=url('${imgComingSoon}')" alt="immagine gioco" class="img"></div></div>

</section>
</main>  `,
  ["sasso-carta-forbice"]: `
  <div class="sasso-carta-forbice">
    <h1 id="titolo">Sasso, Carta, Forbice</h1>
    <div class="scelta">
    <div class="choice">
      <div class="player-choices">
        <img src="${sasso}" class="sasso" data-choice="sasso" id="choice-sasso" alt="Sasso">
        <img src="${carta}" class="carta" data-choice="carta" id="choice-carta" alt="Carta">
        <img src="${forbice}" class="forbici" data-choice="forbici" id="choice-forbici" alt="Forbici">
      </div>
      <h2 id="risultato"> &uarr; Scegli la tua mossa &uarr; </h2>
    </div>
          <img class="imgCpu" src="${interrogativo}" alt="Scelta CPU">

    </div>
    <div class="button">
        <button id="resetButton" class="resetButton">Reset</button>
        </div>
    <div class="contatore">
      <p class="playerC">Player: <span id="contatorePlayer">0</span></p>
      <p class="cpuC">Cpu: <span id="contatoreCpu">0</span></p>
    
  </div>
    </div>
`,
  ["trova-il-codice"]: `
<div class="trova-il-codice">
<header>
    <h1 class="codiceH1">Trova il codice</h1>
</header>
<main>
<section class="codiceS">
<div class="codiceCont">
 <div class="codice-wrapper">
<ul class="codiceL">
</ul>
<svg id="svg-connectors" class="connector-canvas" shape-rendering="crispEdges"></svg>
</div>
</div>
<footer class="codiceF"><div class="codiceTime"><span>01-00</span></div></footer>
</section>
</main>
</div>
`,
  ["ordina-le-parole"]: `
<div class="ordina-le-parole">
  <header>
    <h1 class="paroleH1">Ordina le parole</h1>
  </header>
  <main class="paroleM">
<article class="paroleA">
<p class="parolePtesto" data-text="Nel mezzo del cammin di nostra vita, mi ritrovai per una selva oscura, ch'era piu' oscura di tutte, perche' la diritta via era smarrita da un fiume di seda, e la selva era piena di rossi polveri di latte e di nocciole"></p>
<footer>
<cite class="fonte"></cite>
<span class="paroleSpanCit"> di </span>
<p class="autore"></p>
</footer>
</article>
</main>

</div>

`,
  contact: `
  <main class="contact-page">
    <div class="cont-contact">
     <section class="form-contact-section">
       <h2>Contattaci</h2>
       <form name="form" id="form" action="/" no-validate>
         <fieldset>
           <legend>Compila il modulo</legend>
           <h3 class="invalidH3" >Per favore, correggi tutti i campi evidenziati.</h3>
           <div class="input-wrapper">
       <label for="name">Nome:
          <span id="spanName" class="invalid">*</span><input name="name" id="name" type="text" pattern="^[a-zA-Z\\s]+$" required placeholder="Inserisci un dato valido">
          </label>
          <label for="last-name">Cognome:<span id="spanLast-name" class="invalid">*</span>
         <input name="last-name" id="last-name" type="text" pattern="^[a-zA-Z\\s]+$" placeholder="Inserisci un dato valido" required>
          </label>
          <label for="email">E-mail:<span id="spanEmail" class="invalid">*</span>
         <input name="email" type="email" id="email" pattern="^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$" placeholder="Inserisci un dato valida" required >
          </label>
          </div>
          </fieldset>
        <label for="textarea" >Inserisci il tuo messaggio:
          <textarea name="textarea" id="textarea" placeholder="Scrivi qui..." required></textarea>
        </label>
          <button type="button" id="button-submit">Invia</button>
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
         <div class="border">
          <h3>Il nostro Quartier Generale (Fittizio)</h3>
          <p>Monte Everest(in cima!)</p>
           <p> Nepal </p>
          <p><strong>Email:</strong> <a href="#">info@claudiogames.com</a></p>
          <p><strong>Telefono:</strong> <a href="#">+977 98 1234 5678</a></p>
         </div>
       </div>
      </section>
      
    </div>
  </main>
  `,
  ggg: `
  <div class="contGgg">
    <ul class="terminalL">
        <li class="terminalM">> Inizializzazione sistema... OK<span></span></li>
        <li class="terminalM">> Caricamento moduli... 99%<span></span></li>
        <li class="terminalM">> ERRORE: File 'index.html' non trovato.<span></span></li>
        <li class="terminalM">> Tentativo di ricostruzione in corso...<span></span></li>
        <li class="terminalM">> Compilazione nuovo_sito.jsx...<span></span></li>
        <li class="terminalM">> Lancio stimato: ??.??.2025<span></span></li>
        <li class="terminalM">> .(^_^) STAY TUNED (^_^).<span></span></li>

    </ul>
</div>
`,
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

// --- 4. LA FUNZIONE ANIMAZIONE GGG ---

function animateTerminalLines() {
  const lines = document.querySelectorAll(".terminalM");
  const lineDelay = 3000; // Millisecondi di ritardo tra una riga e l'altra

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add("visibleM");
    }, index * lineDelay);
  });
}
// --- 5. LA FUNZIONE PRINCIPALE DEL ROUTER ---

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
      imgTranslationX();
    });
  });

  page("/news", () => showLoaderAndRender("news", () => newsApiCall()));
  page("/games", () =>
    showLoaderAndRender("games", () => {
      previewGameHandlerPage();
    })
  );
  page("/contact", () => showLoaderAndRender("contact", validateForm));
  page("/ggg", () => showLoaderAndRender("ggg", () => animateTerminalLines));

  // Rotte segnaposto (puoi integrarle in pageList se diventano complesse)
  page("/sasso-carta-forbice", () =>
    showLoaderAndRender("sasso-carta-forbice", scf)
  );
  page("/ordina-le-parole", () =>
    showLoaderAndRender("ordina-le-parole", initWordsGame)
  );
  page("/trova-il-codice", () =>
    showLoaderAndRender("trova-il-codice", createCode)
  );

  // Rotta catch-all per le pagine non trovate (404)
  // Non usa il loader, mostra subito l'errore.
  page("*", () => renderPage("404"));

  // Avvia il router
  page.start();
}