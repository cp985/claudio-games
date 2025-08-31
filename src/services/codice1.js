import { page } from "./page-route.js";

let preStartIntervalId = null;
let timerIntervalId = null;

export function cleanupCodice() {
  if (preStartIntervalId) {
    clearInterval(preStartIntervalId);
    preStartIntervalId = null;
    console.log("Timer di pre-countdown fermato.");
  }
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
    console.log("Timer principale del codice fermato.");
  }
}

class TheCode {
  constructor(id, code) {
    this.id = id;
    this.code = code;
  }
}

export function createCode() {
  cleanupCodice();

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
    new TheCode(1, arr1),
    new TheCode(2, arr2),
    new TheCode(3, arr3),
    new TheCode(4, arr4),
    new TheCode(5, arr5),
  ];

  const container = document.querySelector("div.codiceCont");
  const ul = container.querySelector("ul.codiceL");

  for (let i = 0; i < dictionaryCode.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="switch">
        <div class="form form${i}">
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
        target.classList.add("codiceSwitchActive");
        target.classList.add("codiceSelect");
      }
    });
  }

  function drawAllLines() {
        const svg = document.getElementById("svg-connectors");
    const container = document.querySelector(".codice-wrapper");
    const footer = document.querySelector("footer");
    const switches = document.querySelectorAll("li.codiceLi");

    if (!svg || !container || switches.length < 2 || !footer) return;

    svg.innerHTML = ""; // Pulisce l'SVG a ogni ridisegno
    const containerRect = container.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();

    // --- Disegna linee tra i li ---
    for (let i = 0; i < switches.length - 1; i++) {
      const startRect = switches[i].getBoundingClientRect();
      const endRect = switches[i + 1].getBoundingClientRect();

      if (startRect.width === 0 || endRect.width === 0) continue;

      const startX = startRect.right - containerRect.left;
      const startY = startRect.top + startRect.height / 2 - containerRect.top;
      const endX = endRect.left - containerRect.left;
      const endY = endRect.top + endRect.height / 2 - containerRect.top;

      // --- MODIFICA INIZIA QUI ---
      // 1. Crea la linea esterna (guaina/casing)
      const lineCasing = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      lineCasing.setAttribute("x1", startX);
      lineCasing.setAttribute("y1", startY);
      lineCasing.setAttribute("x2", endX);
      lineCasing.setAttribute("y2", endY);
      lineCasing.setAttribute("class", "connectorLi-casing"); // Classe per la guaina

      // 2. Crea la linea interna (nucleo/core)
      const lineCore = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      lineCore.setAttribute("x1", startX);
      lineCore.setAttribute("y1", startY);
      lineCore.setAttribute("x2", endX);
      lineCore.setAttribute("y2", endY);
      lineCore.setAttribute("class", "connectorLi-core"); // Classe per il nucleo

      // 3. Aggiungile all'SVG (prima la guaina, così sta sotto)
      svg.appendChild(lineCasing);
      svg.appendChild(lineCore);
      // --- MODIFICA FINISCE QUI ---
    }

    // --- Disegna linee dal footer a ciascun li ---
    const xFooter = footerRect.left + footerRect.width / 2 - svgRect.left;
    const yFooter = footerRect.top - svgRect.top;

    switches.forEach((li) => {
      const liRect = li.getBoundingClientRect();
      const xLi = liRect.left + liRect.width / 2 - svgRect.left;
      const yLi = liRect.bottom - svgRect.top;

      // --- MODIFICA INIZIA QUI ---
      // 1. Crea la linea esterna (guaina)
      const footerLineCasing = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      footerLineCasing.setAttribute("x1", xFooter);
      footerLineCasing.setAttribute("y1", yFooter);
      footerLineCasing.setAttribute("x2", xLi);
      footerLineCasing.setAttribute("y2", yLi);
      footerLineCasing.setAttribute("class", "connectorFooter-casing");

      // 2. Crea la linea interna (nucleo)
      const footerLineCore = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      footerLineCore.setAttribute("x1", xFooter);
      footerLineCore.setAttribute("y1", yFooter);
      footerLineCore.setAttribute("x2", xLi);
      footerLineCore.setAttribute("y2", yLi);
      footerLineCore.setAttribute("class", "connectorFooter-core");

      // 3. Aggiungile all'SVG (sempre la guaina prima)
      svg.appendChild(footerLineCasing);
      svg.appendChild(footerLineCore);
      // --- MODIFICA FINISCE QUI ---
    });



  }
  const containerToObserve = document.querySelector(".codice-wrapper");
  if (containerToObserve) {
    const resizeObserver = new ResizeObserver(() =>
      setTimeout(drawAllLines, 50)
    );
    resizeObserver.observe(containerToObserve);
  } else {
    console.error("'.codice-wrapper' non trovato");
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

    preStartIntervalId = setInterval(() => {
      // Aggiungiamo un controllo per fermare il timer se la pagina viene cambiata
      if (!document.querySelector("section.codiceS")) {
        cleanupCodice();
        return;
      }

      preStartSeconds--;
      if (preStartSeconds > 0) {
        timerDisplay.textContent = `Inizio tra ${preStartSeconds}...`;
      } else {
        clearInterval(preStartIntervalId);
        preStartIntervalId = null;
        runMainCountdown(timerDisplay, allSwitches);
      }
    }, 1000);
  }

  function runMainCountdown(timerDisplay, allSwitches) {
    allSwitches.forEach((sw) => sw.classList.remove("placeHolderPreCaunt"));
    timerDisplay.classList.remove("codiceFpre");

    let totalSeconds = 60;
    timerDisplay.textContent = "01-00";
    timerDisplay.style.color = "";

    timerIntervalId = setInterval(() => {
      const currentSection = document.querySelector("section.codiceS"); // ★ MODIFICA CHIAVE: Controlla la presenza dell'elemento PRIMA di procedere. // Se la sezione non esiste, significa che la pagina è stata distrutta. // Ferma il timer e esci dalla funzione.
      if (!currentSection) {
        cleanupCodice(); // Ferma il timer
        return; // Esci per non eseguire il resto del codice
      }
      totalSeconds--;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      timerDisplay.textContent = `${formatTime(minutes)}-${formatTime(
        seconds
      )}`;

      if (totalSeconds <= 0) {
        cleanupCodice();
        timerDisplay.textContent = "00-00";
        timerDisplay.style.color = "red";
        const gameOverDiv = document.createElement("div");
        gameOverDiv.classList.add("game-over");
        gameOverDiv.innerHTML = `
          <article class="artSubmit boom">
            <h2 class="boomH2">YOU LOSE</h2>
            <p>Riprova a disinnescare la bomba.</p>
            <button class="buttonSubmit" id="buttonSubmit">Torna a Games</button>
          </article>
        `;
        const buttonSubmit = gameOverDiv.querySelector("#buttonSubmit");
        buttonSubmit.addEventListener("click", () => page.show("/games")); // Aggiungi un'ulteriore protezione prima di appendere
        const finalSectionCheck = document.querySelector("section.codiceS");
        if (finalSectionCheck) {
          finalSectionCheck.appendChild(gameOverDiv);
        } else {
          console.warn(
            "Tentativo di appendChild fallito: la sezione non esiste più."
          );
        }
      }
    }, 1000);
  }

  startTimer();
}
