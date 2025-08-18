import sasso from '../../assets/img/sasso.webp';
import carta from '../../assets/img/carta.webp';
import forbice from '../../assets/img/forbice.webp';
import interrogativo from '../../assets/img/interrogativo.webp';

export function scf() {
  // --- Selezione degli elementi del DOM ---
  const choicesContainer = document.querySelector(".player-choices");
  const imgCpu = document.querySelector(".imgCpu");
  const risultatoText = document.querySelector("h2#risultato");
  const contatorePlayer = document.getElementById("contatorePlayer");
  const contatoreCpu = document.getElementById("contatoreCpu");
  const resetButton = document.getElementById("resetButton");

  // --- Logica di gioco ---
  const choices = ["sasso", "carta", "forbici"];
  const choiceImages = {
    sasso: document.getElementById("choice-sasso"),
    carta: document.getElementById("choice-carta"),
    forbici: document.getElementById("choice-forbici"),
  };
  const imagePaths = {
    sasso: `${sasso}`,
    carta: `${carta}`,
    forbici: `${forbice}`,
    default: `${interrogativo}`,
  };

  // Funzione per determinare il vincitore
  function determineWinner(player, cpu) {
    if (player === cpu) return "pari";
    if (
      (player === "sasso" && cpu === "forbici") ||
      (player === "carta" && cpu === "sasso") ||
      (player === "forbici" && cpu === "carta")
    ) {
      return "vinto";
    }
    return "perso";
  }

  // Funzione principale che gestisce un round di gioco
  function playRound(playerChoice) {

    
    // 1. Scelta della CPU
    const cpuChoice = choices[Math.floor(Math.random() * 3)];

    // 2. Determina il vincitore
    const result = determineWinner(playerChoice, cpuChoice);

    // 3. Aggiorna l'interfaccia utente
    // Nascondi le scelte non fatte dal giocatore
    for (const choice in choiceImages) {
      if (choice !== playerChoice) {
        choiceImages[choice].style.display = "none";
      }
    }
    // Modifica lo stile della scelta del giocatore
    choiceImages[playerChoice].classList.add("dopoClick");

    // Aggiorna l'immagine della CPU
    imgCpu.src = imagePaths[cpuChoice];
    imgCpu.classList.add("dopoClickCpu");

    // Aggiorna punteggio e testo del risultato
    if (result === "vinto") {
      risultatoText.innerHTML = "Hai Vinto!";
      choiceImages[playerChoice].classList.add("win");
      risultatoText.classList.add("h2win")
      imgCpu.classList.add("lose");
      contatorePlayer.textContent = Number(contatorePlayer.textContent) + 1;
    } else if (result === "perso") {
      risultatoText.innerHTML = "Hai Perso!";
      choiceImages[playerChoice].classList.add("lose");
      contatoreCpu.textContent = Number(contatoreCpu.textContent) + 1;
    } else {
      risultatoText.innerHTML = "Pareggio!";
      imgCpu.classList.add("pareggioCpu");
          risultatoText.classList.add("h2par")
        choiceImages[playerChoice].classList.add("pareggioIo");
    }

    // Mostra il pulsante di reset e disabilita ulteriori click
    resetButton.classList.add("show") ;
    choicesContainer.style.pointerEvents = "none";
  }

  // Funzione per resettare il gioco
  function resetGame() {
    risultatoText.classList.remove("ani","h2par","h2win");
choicesContainer.classList.remove("player-choicesAfter");
    for (const choice in choiceImages) {
      choiceImages[choice].style.display = "block";
      choiceImages[choice].classList.remove("dopoClick", "win", "lose","pareggioIo");
    }
    imgCpu.src = imagePaths.default;
    imgCpu.classList.remove("dopoClickCpu", "lose", "win", "pareggioCpu");
    risultatoText.innerHTML = "&uarr; Scegli la tua mossa &uarr;";
    resetButton.classList.remove("show");
    choicesContainer.style.pointerEvents = "auto";
  }

  // --- Event Listeners ---
  choicesContainer.addEventListener("click", (event) => {
    const playerChoice = event.target.dataset.choice;
     risultatoText.classList.add("ani");
    if (playerChoice) {
      playRound(playerChoice);
    }
       
    choicesContainer.classList.add("player-choicesAfter");
  });

  resetButton.addEventListener("click", resetGame);
}