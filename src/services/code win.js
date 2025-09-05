// ... (codice precedente)
  const dictionaryCode = [
    new TheCode(1, arr1),
    new TheCode(2, arr2),
    new TheCode(3, arr3),
    new TheCode(4, arr4),
    new TheCode(5, arr5),
  ];

// --- INIZIO LOGICA CODICI VINCENTI --- ✨
const winningCombination = [];

// Scorro ogni oggetto nel dictionaryCode (che corrisponde a un <li>)
dictionaryCode.forEach(item => {
  // item.code è l'array di 5 codici per quel <li> (es: ["A12", "B34", "C56", "D78", "E90"])
  
  // Genero un indice casuale da 0 a 4
  const randomIndex = Math.floor(Math.random() * item.code.length); 
  
  // Seleziono il codice a quell'indice come codice vincente per questo <li>
  const winningCode = item.code[randomIndex];
  
  // Aggiungo il codice vincente al nostro array della combinazione corretta
  winningCombination.push(winningCode);
});

// Ora hai la combinazione vincente!
// Puoi vederla nella console per testare.
console.log("La combinazione vincente è:", winningCombination);
// Esempio di output: ["B34", "F11", "Z99", "G45", "K23"]
// --- FINE LOGICA CODICI VINCENTI ---

//render li
const container = document.querySelector("div.codiceCont");
// ... (il resto del codice prosegue normalmente) ...

// Aggiungi questa funzione da qualche parte nel tuo codice
function checkResult() {
  const userChoices = [];
  
  // 1. Raccogli tutte le scelte dell'utente
  const selectedRadios = document.querySelectorAll('input[type="radio"]:checked');
  selectedRadios.forEach(radio => {
    // Aggiungiamo solo i valori reali, non quello del placeholder se fosse selezionabile
    if (radio.value) { 
      userChoices.push(radio.value);
    }
  });

  // 2. Assicurati che l'utente abbia fatto 5 scelte
  if (userChoices.length !== 5) {
    console.log("Devi selezionare un codice per ogni riga!");
    return; // Esce dalla funzione
  }

  // 3. Confronta le scelte con la combinazione vincente
  // N.B.: Confrontare due array in JS si fa meglio convertendoli in stringhe
  const userWon = JSON.stringify(userChoices) === JSON.stringify(winningCombination);

  // 4. Mostra il risultato
  if (userWon) {
    console.log("HAI VINTO! Bomba disinnescata!");
    // Qui mostri la schermata di vittoria
  } else {
    console.log("HAI PERSO! La combinazione è sbagliata.");
    // Qui mostri la schermata di sconfitta
  }
  checkResult();
}