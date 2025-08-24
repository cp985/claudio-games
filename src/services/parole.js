import Sortable from 'sortablejs';


// ... (la tua classe Words va qui)
class Words{
    constructor(id,testo,fonte,autore){
    this.id=id;
    this.testo=testo;
    this.fonte=fonte;
    this.autore=autore;
    }
};

// --- DATI DI GIOCO (Migliorati usando un Array) ---
const sentences = [
    new Words(1, "Questa è una frase di prova! Se riuscirai a completarmi passerai alla successiva!", "Book of Admin", "Admin"),
    new Words(2, "Quel ramo del lago di Como, che volge a mezzogiorno, tra due catene non interrotte di monti, tutto a seni e a golfi, a seconda dello sporgere e del rientrare di quelli, vien, quasi a un tratto, a ristringersi, e a prender corso e figura di fiume, tra un promontorio a destra, e un’ampia costiera dall’altra parte.", "I Promessi Sposi", "Alessandro Manzoni"),
    new Words(3, "Ho visto cose che voi umani non potreste immaginare: navi da combattimento in fiamme al largo dei bastioni di Orione, e ho visto i raggi B balenare nel buio vicino alle porte di Tannhäuser. E tutti quei momenti andranno perduti nel tempo, come lacrime nella pioggia. È tempo di morire.", "Blade Runner", "Ridley Scott"),
    new Words(4, "Nel mezzo del cammin di nostra vita, mi ritrovai per una selva oscura, ch'era piu' oscura di tutte, perche' la diritta via era smarrita da un fiume di seda, e la selva era piena di rossi polveri di latte e di nocciole.", "Divina Commedia", "Dante Alighieri"),
];

// --- VARIABILI DI STATO ---
let currentSentenceIndex = 0; // Usiamo un indice a base 0, più standard
let sortableInstance = null; // Per tenere traccia dell'istanza di Sortable

// --- RIFERIMENTI AL DOM ---

// --- FUNZIONI ---

function shuffleArr(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Funzione principale che carica una frase, la mescola e aggiorna il DOM.
 */

/**
 * Funzione che viene eseguita una sola volta per inizializzare il gioco.
 */
export function initWordsGame() {
  const pTesto = document.querySelector("p.parolePtesto");
const article = document.querySelector("article.paroleA");

    sortableInstance = new Sortable(pTesto, {
delay:50,
delayOnTouchOnly: true,
animation:150,
swapThreshold: 0.5,
invertSwap: false,
forceFallback: true,
easing: "ease-in-out",
draggable: ".testo",
ghostClass: "sortable-ghost",
dragClass: "sortable-drag",
chosenClass: "sortable-choose",
fallbackClass: "sortable-fallback",


        onEnd: function(evt) {
            const paroleAttuali = Array.from(pTesto.querySelectorAll("span.testo"));
            const fraseRicostruita = paroleAttuali.map(span => span.textContent).join(" ");
            const fraseOriginaleCorretta = sentences[currentSentenceIndex].testo;

            if (fraseRicostruita === fraseOriginaleCorretta) {
                console.log("VITTORIA! Hai ricostruito la frase correttamente.");
                
                // Disabilita il drag & drop per non fare confusione
                this.option('disabled', true);
                pTesto.classList.add('completed');

                // Crea il messaggio di vittoria
                const divWinner = document.createElement('div');
                divWinner.classList.add('divWinner', 'view');
                divWinner.innerHTML = `
                    <h2 class="h2Winner">HAI VINTO!</h2>
                    <p class="pWinner">Hai ricostruito la frase correttamente. Premi il pulsante per la prossima frase.</p>
                    <button class="buttonNext" id="buttonNext">Prossima frase</button>
                `;
                article.appendChild(divWinner);

                // Aggiungi il listener al nuovo pulsante
                const buttonNext = document.getElementById('buttonNext');
                buttonNext.addEventListener('click', () => {
                    // LA LOGICA CORRETTA VA QUI
                    currentSentenceIndex++; // Incrementa l'indice per la prossima frase
                    loadSentence(); // Richiama la funzione per caricare la nuova frase!
                });
            }
        }
    });

    // Carica la prima frase per iniziare il gioco
  function loadSentence() {
    
  
  const fonteP = article.querySelector("cite.fonte");
const autoreP = article.querySelector("p.autore");

    // 1. Controlla se il gioco è finito
    if (currentSentenceIndex >= sentences.length) {
        pTesto.innerHTML = "<h2>Complimenti, hai completato tutte le frasi!</h2>";
        // Nascondiamo le info extra
        fonteP.style.display = 'none';
        autoreP.style.display = 'none';
        return;
    }

    // 2. Pulisci il contenitore dalle parole precedenti
    pTesto.innerHTML = ''; 
    pTesto.classList.remove('completed');

    // Pulisci eventuali messaggi di vittoria
    const oldWinnerDiv = article.querySelector('.divWinner');
    if (oldWinnerDiv) {
        oldWinnerDiv.remove();
    }

    // 3. Prendi i dati della frase corrente
    const currentSentence = sentences[currentSentenceIndex];
    const fraseOriginale = currentSentence.testo;
    const parole = fraseOriginale.split(" ");
    const paroleMescolate = shuffleArr(parole);

    // 4. Aggiorna il DOM con le nuove parole
    paroleMescolate.forEach(parola => {
        const span = document.createElement("span");
        span.draggable = true;
        span.classList.add("testo");
        span.textContent = parola;
        pTesto.appendChild(span);
    });

    // 5. Aggiorna fonte e autore
    fonteP.textContent = currentSentence.fonte;
    autoreP.textContent = currentSentence.autore;
    
    // Attiva la possibilità di ordinare
    if(sortableInstance) sortableInstance.option('disabled', false);
  }

  loadSentence();
}



