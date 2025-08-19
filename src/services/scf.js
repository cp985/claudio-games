import sasso from "../../assets/img/sasso.webp";
import carta from "../../assets/img/carta.webp";
import forbice from "../../assets/img/forbice.webp";
import interrogativo from "../../assets/img/interrogativo.webp";

export function scf() {
  // --- Selezione degli elementi del DOM ---
  const choicesContainer = document.querySelector(".player-choices");
  const imgCpu = document.querySelector(".imgCpu");
  const risultatoText = document.querySelector("h2#risultato");
  const contatorePlayer = document.getElementById("contatorePlayer");
  const contatoreCpu = document.getElementById("contatoreCpu");
  const resetButton = document.getElementById("resetButton");
  const divBtn = document.querySelector(".button");
  const titolo = document.querySelector("h1#titolo");
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
      choiceImages[playerChoice].classList.add("dopoIo","win");
      // risultatoText.classList.add("h2win")
      imgCpu.classList.add("dopoCpu");
      contatorePlayer.textContent = Number(contatorePlayer.textContent) + 1;
    } else if (result === "perso") {
      risultatoText.innerHTML = "Hai Perso!";
      imgCpu.classList.add("cpu-wins-style","dopoClickCpu");
      choiceImages[playerChoice].classList.add("dopoIo");

      contatoreCpu.textContent = Number(contatoreCpu.textContent) + 1;
    } else {
      risultatoText.innerHTML = "Pareggio!";
      imgCpu.classList.add("dopoCpu");
      // risultatoText.classList.add("h2par")
      choiceImages[playerChoice].classList.add("dopoIo");
    }

    // Mostra il pulsante di reset e disabilita ulteriori click
    divBtn.classList.add("show");
    choicesContainer.style.pointerEvents = "none";
  }

  // Funzione per resettare il gioco
  function resetGame() {
    titolo.classList.remove("titoloPost");
    risultatoText.classList.remove("ani");
    choicesContainer.classList.remove("player-choicesAfter");
    for (const choice in choiceImages) {
      choiceImages[choice].style.display = "block";
      choiceImages[choice].classList.remove("win","dopoClick", "dopoCpu", "dopoIo");
    }
    imgCpu.src = imagePaths.default;
    imgCpu.classList.remove("dopoClickCpu","cpu-wins-style");
    risultatoText.innerHTML = "&uarr; Scegli la tua mossa &uarr;";
    divBtn.classList.remove("show");
    choicesContainer.style.pointerEvents = "auto";
  }

  // --- Event Listeners ---
  choicesContainer.addEventListener("click", (event) => {
    const playerChoice = event.target.dataset.choice;
    titolo.classList.add("titoloPost");
    risultatoText.classList.add("ani");
    if (playerChoice) {
      playRound(playerChoice);
    }

    choicesContainer.classList.add("player-choicesAfter");
  });

  resetButton.addEventListener("click", resetGame);
}
