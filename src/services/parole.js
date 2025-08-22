
class Words{
constructor(id,testo,fonte,autore){
this.id=id;
this.testo=testo;
this.fonte=fonte;
this.autore=autore;
}
};


const wordsDb={
  frase4: new Words(
  4,
  "Ciao sono io.",
"Blade Runner",
"Ridley Scott"
),
frase1: new Words(
  1,
"Nel mezzo del cammin di nostra vita, mi ritrovai per una selva oscura, ch'era piu' oscura di tutte, perche' la diritta via era smarrita da un fiume di seda, e la selva era piena di rossi polveri di latte e di nocciole",
"Divina Commedia",
"Dante Alighieri"
),

frase2: new Words(
  2,
  "Quel ramo del lago di Como, che volge a mezzogiorno, tra due catene non interrotte di monti, tutto a seni e a golfi, a seconda dello sporgere e del rientrare di quelli, vien, quasi a un tratto, a ristringersi, e a prender corso e figura di fiume, tra un promontorio a destra, e un’ampia costiera dall’altra parte.",
  "I Promessi Sposi",
  "Alessandro Manzoni"
),

frase3: new Words(
  3,
  "Ho visto cose che voi umani non potreste immaginare: navi da combattimento in fiamme al largo dei bastioni di Orione, e ho visto i raggi B balenare nel buio vicino alle porte di Tannhäuser. E tutti quei momenti andranno perduti nel tempo, come lacrime nella pioggia. È tempo di morire.",
"Blade Runner",
"Ridley Scott"
),

}

let countFrase=1;


function shuffleArr(array){  
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
return arr;
}


export function initOrdinaLeParole() {
  
  // 1. Selezioniamo il container principale del gioco
  const pTesto = document.querySelector("p.parolePtesto");
  
  // Controllo di sicurezza: se l'elemento non esiste, fermiamo tutto.
  if (!pTesto) {
    console.error("Container del gioco 'p.parolePtesto' non trovato!");
    return;
  }
  
  // Evita di rieseguire il codice se la pagina viene ricaricata male
  if (pTesto.children.length > 0) {
      return;
  }

  // 2. Prendiamo la frase, la dividiamo e la mescoliamo
  const fraseOriginale = `${wordsDb[Object.keys(wordsDb)[countFrase-1]].testo}`; // Rinomino per chiarezza
  const parole = fraseOriginale.split(" ");
  const paroleMescolate = shuffleArr(parole);

  // 3. Creiamo gli elementi <span> e li aggiungiamo al DOM
  paroleMescolate.forEach(parola => {
    const span = document.createElement("span");
    span.draggable = true;
    span.classList.add("testo");
    span.textContent = parola;
    pTesto.appendChild(span);
  });

  // 4. Aggiungiamo i listener UNA SOLA VOLTA al container genitore (Event Delegation)
  let draggedElement = null;

  pTesto.addEventListener("dragstart", (e) => {
    if (e.target.matches("span.testo")) {
      draggedElement = e.target;
      e.dataTransfer.effectAllowed = "move";
      setTimeout(() => e.target.classList.add("dragging"), 0);
    }
  });

  pTesto.addEventListener("dragend", (e) => {
    if (draggedElement) {
        draggedElement.classList.remove("dragging");
        draggedElement = null;
    }
  });

  pTesto.addEventListener("dragover", (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.matches("span.testo") && target !== draggedElement) {
      // Potresti voler aggiungere qui una classe per l'hover, se vuoi
    target.classList.add("dragging")
    }
  });
  
  pTesto.addEventListener('dragleave', (e) => {
    // Non strettamente necessario, ma pulisce l'effetto hover se lo implementi
      const target = e.target;
    target.classList.remove("dragging")

  });
  
  pTesto.addEventListener('drop', (e) => {
    e.preventDefault();
    
    const dropTarget = e.target;
    const target= e.target;
        target.classList.remove("dragging")

    if (dropTarget.matches('span.testo') && draggedElement && dropTarget !== draggedElement) {
      
      const draggedIndex = [...pTesto.children].indexOf(draggedElement);
      const targetIndex = [...pTesto.children].indexOf(dropTarget);

      // Logica di spostamento più semplice e robusta
      if (draggedIndex < targetIndex) {
        pTesto.insertBefore(draggedElement, dropTarget.nextSibling);
      } else {
        pTesto.insertBefore(draggedElement, dropTarget);
      }
    }
  
    // --- ECCO LA CORREZIONE ---
    // Dopo ogni mossa, controlliamo se la frase è corretta.

    // 1. Raccogliamo tutte le parole nell'ordine attuale in modo pulito
    const paroleAttuali = Array.from(pTesto.querySelectorAll("span.testo"));
    const fraseRicostruita = paroleAttuali.map(span => span.textContent).join(" ");

    // 2. Confrontiamo la frase ricostruita con quella originale
    //    e mostriamo il log SOLO SE sono uguali.
    if (fraseRicostruita === fraseOriginale) {
      console.log("VITTORIA! Hai ricostruito la frase correttamente.");
      const main = document.querySelector("main.paroleM");
      const article = document.querySelector('article.paroleA');
      const divWinner = document.createElement('div');
      divWinner.classList.add('divWinner','view');

      divWinner.innerHTML = `
      <h2 class="h2Winner">HAI VINTO!</h2>
      <p class="pWinner">Hai ricostruito la frase correttamente.Premi il pulsante per la prossima frase..</p>
      <button class="buttonNext" id="buttonNext">Prossima frase</button>
      `;
      
      article.appendChild(divWinner);
      const buttnoWinner = document.getElementById('buttonNext');
      buttnoWinner.addEventListener('click',()=>{

if(countFrase > Object.keys(wordsDb).length){countFrase=1;}
  countFrase++;
divWinner.classList.remove('view');


      })
            
      // Bonus: una volta vinto, puoi disabilitare il drag and drop
      paroleAttuali.forEach(span => span.draggable = false);
      pTesto.classList.add('completed'); // Aggiungi una classe per lo stile
    }
  });
}

