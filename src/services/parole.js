

function shuffleArr(array){  
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
return arr;
}

export function textArray(){
    const pTesto = document.querySelector("p.parolePtesto");
const frase = pTesto.dataset.text;
const arr1=frase.split(" ");
const arr2=[...arr1];
const arrShuffled = shuffleArr(arr2);
console.log(arrShuffled);
const spanTesto = document.createElement("span");
  if (!pTesto) {
    console.error("Il paragrafo con classe 'parolePtesto' non è stato trovato!");
    return;
  }
spanTesto.classList.add("testo");
if (pTesto.children.length > 0) {
      return;
  }else{
arrShuffled.forEach(element => {
    const span = document.createElement("span");
    span.draggable = true;
    span.classList.add("testo");
    span.textContent=element;
    pTesto.appendChild(span);
})
}
}

// export function textValidator(el){
//       const pTesto = document.querySelector("p.parolePtesto");
// const spanT = document.querySelector("span.testo");
// pTesto.addEventListener("dragstart", (e) => {
//   if(!e.target.matches("span.testo")){return;}
//   e.dataTransfer.setData("text", e.target.textContent);
// e.dataTransfer.effectAllowed = "move";
// el.parentElement.classList.add("dragStart");
// })

// el.addEventListener("dragend", (e) => {
//   el.parentElement.classList.remove("dragStart");
  
// })
// }

// function dragOverHandler(){



// }
 
// L'UNICA funzione che esporteremo. Si occupa di tutto il setup del gioco.
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
  const frase = pTesto.dataset.text;
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
        // Logica per spostare le parole mentre trasciniamo (opzionale ma carino)
        // pTesto.insertBefore(draggedElement, target);
    }
  });
  
   pTesto.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.matches('span.testo') && e.target !== draggedElement) {
      // Inserisci l'elemento trascinato prima dell'elemento di destinazione
      pTesto.insertBefore(draggedElement, e.target);
    }
   });
}