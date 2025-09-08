import { page } from "./page-route.js";

// <-- SOLUZIONE 1: Spostiamo gli ID degli intervalli qui, fuori dalla funzione.
// In questo modo, mantengono il loro valore tra le diverse chiamate a createCode.
let activeTimerIntervalId = null;
let activePreStartIntervalId = null;

class TheCode {
  constructor(id, code) {
    this.id = id;
    this.code = code;
  }
}

export function createCode() {
  // <-- SOLUZIONE 2: Blocco di pulizia all'inizio della funzione.
  // Ferma qualsiasi timer "zombie" delle esecuzioni precedenti.
  if (activePreStartIntervalId) {
    clearInterval(activePreStartIntervalId);
  }
  if (activeTimerIntervalId) {
    clearInterval(activeTimerIntervalId);
  }

  // È anche una buona pratica svuotare il contenitore prima di riempirlo di nuovo,
  // per evitare di duplicare gli elementi <li> se la funzione viene chiamata più volte.
  const container = document.querySelector("div.codiceCont");
  if (container) {
      const ul = container.querySelector("ul.codiceL");
      if (ul) ul.innerHTML = ''; // Svuota la lista precedente!
  }
  // --- Fine del blocco di pulizia ---


  // ----- (Tutta la parte di generazione dei codici rimane invariata) -----
  let lettera = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabetArr = alphabet.split("");
    const n = Math.floor(Math.random() * 26);
    return alphabetArr[n];
  };
  let numero = () => {
    return Math.floor(Math.random() * 100);
  };
  let codice = () => {
    const codes = [];
    for (let i = 0; i < 5; i++) {
      let codeX = [];
      for (let k = 0; k < 5; k++) {
        codeX.push(lettera() + numero());
      }
      codes.push(codeX);
    }
    return codes;
  };
  const [arr1, arr2, arr3, arr4, arr5] = codice();
  const dictionaryCode = [
    new TheCode(1, arr1), new TheCode(2, arr2), new TheCode(3, arr3),
    new TheCode(4, arr4), new TheCode(5, arr5)
  ];
  const winningCombination = [];
  dictionaryCode.forEach((item) => {
    const randomIndex = Math.floor(Math.random() * item.code.length);
    winningCombination.push(item.code[randomIndex]);
  });
  // ----- (Fine parte invariata) -----


  let totalSeconds;
  let gameIsOver = false;

  function triggerWin() {
    if (gameIsOver) return;
    gameIsOver = true;
    clearInterval(activeTimerIntervalId); // <-- SOLUZIONE 3: Usa il nuovo nome della variabile
    const section = document.querySelector("section.codiceS");
    // ... (resto della funzione triggerWin invariato)
    if (section) {
      const gameOverArt = document.createElement("article");
      gameOverArt.classList.add("artSubmit", "winner");
      gameOverArt.innerHTML = `
        <h2 class="boomH2">YOU WIN!!</h2>
        <p>Congratulazioni hai disinnescato la bomba!</p>
        <button class="buttonSubmit" id="buttonSubmit">Torna a Games</button>
      `;
      const buttonSubmit = gameOverArt.querySelector("#buttonSubmit");
      buttonSubmit.addEventListener("click", () => page.show("/games"));
      section.appendChild(gameOverArt);
    }
  }

  function triggerLoss() {
    if (gameIsOver) return;
    gameIsOver = true;
    const timerDisplay = document.querySelector(".codiceTime span");
    if(timerDisplay) {
        timerDisplay.textContent = "00-00";
        timerDisplay.style.color = "red";
    }
    const section = document.querySelector("section.codiceS");
    // ... (resto della funzione triggerLoss invariato)
     if (section) {
      const gameOverArt = document.createElement("article");
      gameOverArt.classList.add("artSubmit", "boom");
      gameOverArt.innerHTML = `
        <h2 class="boomH2">YOU LOSE</h2>
        <p>Il tempo è scaduto! Riprova a disinnescare la bomba.</p>
        <button class="buttonSubmit" id="buttonSubmit">Torna a Games</button>
      `;
      const buttonSubmit = gameOverArt.querySelector("#buttonSubmit");
      buttonSubmit.addEventListener("click", () => page.show("/games"));
      section.appendChild(gameOverArt);
    }
  }

  // --- Render e logica dei click ---
  //const container = document.querySelector("div.codiceCont"); // già dichiarato sopra
  const ul = container.querySelector("ul.codiceL");
  for (let i = 0; i < dictionaryCode.length; i++) {
    // ... (tutta la logica di creazione li e gestione click rimane invariata)
    const li = document.createElement("li");
        li.innerHTML = `
    <div class="switch">
<div class="form  form${i}">
<label class="placeholder" for="placeholder${i}"><span>&#9746;&#9746;&#9746;</span>
<input type="radio" name="codice${i}" id="placeholder${i}" value="">
</label>
<label class="codiceSwitch" for="codice${i}-0"><span>${dictionaryCode[i].code[0]}</span>
<input type="radio" name="codice${i}" id="codice${i}-0" value="${dictionaryCode[i].code[0]}">
</label>
<label class="codiceSwitch" for="codice${i}-1"><span>${dictionaryCode[i].code[1]}</span>
<input type="radio" name="codice${i}" id="codice${i}-1" value="${dictionaryCode[i].code[1]}">
</label>
<label class="codiceSwitch" for="codice${i}-2"><span>${dictionaryCode[i].code[2]}</span>
<input type="radio" name="codice${i}" id="codice${i}-2" value="${dictionaryCode[i].code[2]}">
</label>
<label class="codiceSwitch" for="codice${i}-3"><span>${dictionaryCode[i].code[3]}</span>
<input type="radio" name="codice${i}" id="codice${i}-3" value="${dictionaryCode[i].code[3]}">
</label>
<label class="codiceSwitch" for="codice${i}-4"><span>${dictionaryCode[i].code[4]}</span>
<input type="radio" name="codice${i}" id="codice${i}-4" value="${dictionaryCode[i].code[4]}">
</label>
</div>
</div>
`;
    li.classList.add("codiceLi", "circuito-minimalista");
    ul.appendChild(li);

    const divForm = li.querySelector("div.form");
    const labelPlaceholder = li.querySelector("label.placeholder");
    const codici = li.querySelectorAll("label.codiceSwitch");

    divForm.addEventListener("click", (e) => {
      const target = e.target;
      if (!labelPlaceholder.classList.contains("placeHolderNone")) {
        labelPlaceholder.classList.add("placeHolderNone");
        codici.forEach((label) => label.classList.add("codiceSwitchActive"));
        return;
      }
      if (target.classList.contains("codiceSelect")) {
        target.classList.remove("codiceSelect");
        codici.forEach((label) => label.classList.add("codiceSwitchActive"));
        return;
      }
      if (target.classList.contains("codiceSwitchActive")) {
        codici.forEach((label) => {
          label.classList.remove("codiceSwitchActive");
          label.classList.remove("codiceSelect");
        });
        target.classList.add("codiceSwitchActive", "codiceSelect");
      }

      const clickedLabel = e.target.closest('label.codiceSwitch');
      if (clickedLabel) {
        const inputElement = clickedLabel.querySelector('input');
        if (inputElement) {
          const sceltaUtente = inputElement.value;
          const codiceVincenteRiga = winningCombination[i];

          if (sceltaUtente === codiceVincenteRiga) {
            clickedLabel.classList.add("codiceCorretto");
            divForm.style.pointerEvents = 'none';

            const codiciCorretti = document.querySelectorAll('.codiceCorretto').length;
            if (codiciCorretti === 5) {
              triggerWin();
            }
          } else {
            totalSeconds -= 1; 
            clickedLabel.classList.add("codiceErrato");
            if (totalSeconds < 0) totalSeconds = 0;
            updateTimerDisplay();
          }
        }
      }
    });
  }

  // --- (La parte delle linee SVG rimane invariata) ---
  // ... il tuo codice per drawAllLines() va qui ...
  function drawAllLines() {
    const svg = document.getElementById("svg-connectors");
    const container = document.querySelector(".codice-wrapper");
    const footer = document.querySelector("footer");
    const switches = document.querySelectorAll("li.codiceLi");
    if (!svg || !container || switches.length < 2 || !footer) return;
    svg.innerHTML = ""; 
    const containerRect = container.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    for (let i = 0; i < switches.length - 1; i++) {
      const startRect = switches[i].getBoundingClientRect();
      const endRect = switches[i + 1].getBoundingClientRect();
      if (startRect.width === 0 || endRect.width === 0) continue;
      const startX = startRect.right - containerRect.left;
      const startY = startRect.top + startRect.height / 2 - containerRect.top;
      const endX = endRect.left - containerRect.left;
      const endY = endRect.top + endRect.height / 2 - containerRect.top;
      const lineCasing = document.createElementNS("http://www.w3.org/2000/svg", "line");
      lineCasing.setAttribute("x1", startX); lineCasing.setAttribute("y1", startY); lineCasing.setAttribute("x2", endX); lineCasing.setAttribute("y2", endY); lineCasing.setAttribute("class", "connectorLi-casing");
      const lineCore = document.createElementNS("http://www.w3.org/2000/svg", "line");
      lineCore.setAttribute("x1", startX); lineCore.setAttribute("y1", startY); lineCore.setAttribute("x2", endX); lineCore.setAttribute("y2", endY); lineCore.setAttribute("class", "connectorLi-core"); 
      svg.appendChild(lineCasing); svg.appendChild(lineCore);
    }
    const xFooter = footerRect.left + footerRect.width / 2 - svgRect.left;
    const yFooter = footerRect.top - svgRect.top;
    switches.forEach((li) => {
      const liRect = li.getBoundingClientRect();
      const xLi = liRect.left + liRect.width / 2 - svgRect.left;
      const yLi = liRect.bottom - svgRect.top;
      const footerLineCasing = document.createElementNS("http://www.w3.org/2000/svg", "line");
      footerLineCasing.setAttribute("x1", xFooter); footerLineCasing.setAttribute("y1", yFooter); footerLineCasing.setAttribute("x2", xLi); footerLineCasing.setAttribute("y2", yLi); footerLineCasing.setAttribute("class", "connectorFooter-casing");
      const footerLineCore = document.createElementNS("http://www.w3.org/2000/svg", "line");
      footerLineCore.setAttribute("x1", xFooter); footerLineCore.setAttribute("y1", yFooter); footerLineCore.setAttribute("x2", xLi); footerLineCore.setAttribute("y2", yLi); footerLineCore.setAttribute("class", "connectorFooter-core");
      svg.appendChild(footerLineCasing); svg.appendChild(footerLineCore);
    });
  }
  const containerToObserve = document.querySelector(".codice-wrapper");
  if (containerToObserve) {
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(drawAllLines, 50);
    });
    resizeObserver.observe(containerToObserve);
  }
  
  // --- LOGICA TIMER ---
  function updateTimerDisplay() { /* ... invariato ... */ 
      const timerDisplay = document.querySelector(".codiceTime span");
      if (!timerDisplay) return;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      timerDisplay.textContent = `${formatTime(minutes)}-${formatTime(seconds)}`;
  }
  const formatTime = (num) => num.toString().padStart(2, "0");

  function startTimer() {
    const timerDisplay = document.querySelector(".codiceTime span");
    const allSwitches = document.querySelectorAll("li.codiceLi");
    if (!timerDisplay || allSwitches.length === 0) return;
    allSwitches.forEach((sw) => sw.classList.add("placeHolderPreCaunt"));
    let preStartSeconds = 5;
    timerDisplay.classList.add("codiceFpre");
    timerDisplay.textContent = `Inizio tra ${preStartSeconds}...`;
    timerDisplay.style.color = "#ffc107";
    
    // <-- SOLUZIONE 3: Usa il nuovo nome della variabile
    activePreStartIntervalId = setInterval(() => {
      const timerDisplay = document.querySelector(".codiceTime span");
      if (!timerDisplay) {
        clearInterval(activePreStartIntervalId);
        return;
      }
      preStartSeconds--;
      if (preStartSeconds > 0) {
        timerDisplay.textContent = `Inizio tra ${preStartSeconds}...`;
      } else {
        clearInterval(activePreStartIntervalId);
        runMainCountdown();
      }
    }, 1000);
  }

  function runMainCountdown() {
    const timerDisplay = document.querySelector(".codiceTime span");
    const allSwitches = document.querySelectorAll("li.codiceLi");
    allSwitches.forEach((sw) => sw.classList.remove("placeHolderPreCaunt"));
    timerDisplay.classList.remove("codiceFpre");
    totalSeconds = 60;
    updateTimerDisplay();
    timerDisplay.style.color = "";
    
    // <-- SOLUZIONE 3: Usa il nuovo nome della variabile
    activeTimerIntervalId = setInterval(() => {
      if (gameIsOver) {
          clearInterval(activeTimerIntervalId);
          return;
      }
      totalSeconds--;
      updateTimerDisplay();
      if (totalSeconds <= 0) {
        clearInterval(activeTimerIntervalId);
        triggerLoss();
      }
    }, 1000);
  }

  startTimer();

  // --- Funzione di cleanup ---
  // Questa funzione è chiamata da page.js quando cambi pagina. Ora pulirà i timer corretti.
  return () => {
    if (activePreStartIntervalId) {
      clearInterval(activePreStartIntervalId);
    }
    if (activeTimerIntervalId) {
      clearInterval(activeTimerIntervalId);
    }
  };
}