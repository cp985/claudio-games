
class Words{
constructor(id,testo,fonte,autore){
this.id=id;
this.testo=testo;
this.fonte=fonte;
this.autore=autore;
}
};

const wordsDb={
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
)
}





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
  const frase = wordsDb.frase1.testo;
  const parole = frase.split(" ");
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
  // Questo è molto più efficiente che aggiungere un listener a ogni singola parola!
  
  let draggedElement = null; // Teniamo traccia dell'elemento trascinato

  pTesto.addEventListener("dragstart", (e) => {
    // L'evento si attiva solo se stiamo trascinando una parola
    if (e.target.matches("span.testo")) {
      draggedElement = e.target; // Salviamo l'elemento che stiamo trascinando
      e.dataTransfer.effectAllowed = "move";
      // Aggiungiamo un feedback visivo leggero
      setTimeout(() => e.target.classList.add("dragging"), 0);
    }
  });

  pTesto.addEventListener("dragend", (e) => {
    // Pulizia: rimuoviamo la classe di feedback visivo
    if (draggedElement) {
        draggedElement.classList.remove("dragging");
        draggedElement = null;
    }
  });

  // Permettiamo agli elementi di essere "rilasciati" sopra il container
  pTesto.addEventListener("dragover", (e) => {
    e.preventDefault(); // Fondamentale per far funzionare l'evento 'drop'
    const target = e.target;
    if (target.matches("span.testo") && target !== draggedElement) {
      target.classList.add("dragging");}
  });
  
  pTesto.addEventListener('dragleave', (e) => {
    e.preventDefault();
    const target = e.target;
    target.classList.remove("dragging");
  })
  pTesto.addEventListener('drop', (e) => {
    e.preventDefault();
    
    const dropTarget = e.target;
dropTarget.classList.remove("dragging");
    // Assicurati che stiamo rilasciando su un altro span valido
    if (dropTarget.matches('span.testo') && dropTarget !== draggedElement) {
      
      // Salviamo le posizioni di riferimento PRIMA di spostare qualsiasi cosa
      const draggedNextSibling = draggedElement.nextSibling;
      const dropTargetNextSibling = dropTarget.nextSibling;

      // 1. Sposta l'elemento trascinato al posto del target
      //    Se il target è l'ultimo, nextSibling sarà null, e insertBefore si comporterà come appendChild
      pTesto.insertBefore(draggedElement, dropTargetNextSibling);

      // 2. Sposta il target al posto originale dell'elemento trascinato
      pTesto.insertBefore(dropTarget, draggedNextSibling);
    }
  
  
  const fraseX=  pTesto.querySelectorAll("span.testo");
  const arrX=[];
  console.log(fraseX.forEach(parola => {
  arrX.push(parola.textContent);
  
}))
if(!arrX.length===0){
  console.log("array risposta vuoto");
  }else{

  arrX.join(" ") === frase 
      console.log("Hai vinto!");
  }



  });
}



