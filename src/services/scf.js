import sasso from '../../assets/img/sasso.webp';
import carta from '../../assets/img/carta.webp';
import forbice from '../../assets/img/forbice.webp';
import interrogativo from '../../assets/img/interrogativo.webp';

export function scf() {
  // --- Selezione degli elementi del DOM ---
  const choicesContainer = document.querySelector(".player-choices");
  const imgCpu = document.querySelector(".imgCpu");
  const risultatoText = document.getElementById("risultato");
  const contatorePlayer = document.getElementById("contatorePlayer");
  const contatoreCpu = document.getElementById("contatoreCpu");
  const resetButton = document.getElementById("resetButton");
  const sceltaDiv = document.querySelector(".scelta");

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
        sceltaDiv.style.width = "75%";
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
      contatorePlayer.textContent = Number(contatorePlayer.textContent) + 1;
    } else if (result === "perso") {
      risultatoText.innerHTML = "Hai Perso!";
      contatoreCpu.textContent = Number(contatoreCpu.textContent) + 1;
    } else {
      risultatoText.innerHTML = "Pari!";
    }

    // Mostra il pulsante di reset e disabilita ulteriori click
    resetButton.classList.add("show") ;
    choicesContainer.style.pointerEvents = "none";
  }

  // Funzione per resettare il gioco
  function resetGame() {
    for (const choice in choiceImages) {
      sceltaDiv.style.width = "100%";
      choiceImages[choice].style.display = "block";
      choiceImages[choice].classList.remove("dopoClick");
    }
    imgCpu.src = imagePaths.default;
    imgCpu.classList.remove("dopoClickCpu");
    risultatoText.innerHTML = "Scegli la tua mossa";
    resetButton.classList.remove("show");
    choicesContainer.style.pointerEvents = "auto";
  }

  // --- Event Listeners ---
  choicesContainer.addEventListener("click", (event) => {
    const playerChoice = event.target.dataset.choice;
    if (playerChoice) {
      playRound(playerChoice);
    }
  });

  resetButton.addEventListener("click", resetGame);
}