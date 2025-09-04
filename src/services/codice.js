import { page } from "./page-route.js";

class TheCode {
  constructor(id, code) {
    this.id = id;
    this.code = code;
  }
}

export function createCode() {
  //genera lettera casuale da associare al numero
  let lettera = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabetArr = alphabet.split("");
    const n = Math.floor(Math.random() * 26);
    let lettera = alphabetArr[n];
    return lettera;
  };

  //genera numero casuale da associare alla lettera
  let numero = () => {
    let n = Math.floor(Math.random() * 100);
    let numero = n;
    return numero;
  };
  //genera in codice (..quasi..) univoco sommando lettera e numero
  let codice = () => {
    const codes = [];
    for (let i = 0; i < 5; i++) {
      let codeX = [];
      for (let k = 0; k < 5; k++) {
        let codeY = lettera() + numero();
        codeX.push(codeY);
      }
      codes.push(codeX);
    }
    return codes;
  };

  //creo i 5 obj per i li
  const [arr1, arr2, arr3, arr4, arr5] = codice();

  const dictionaryCode = [
    new TheCode(1, arr1),
    new TheCode(2, arr2),
    new TheCode(3, arr3),
    new TheCode(4, arr4),
    new TheCode(5, arr5),
  ];

  //render li

  const container = document.querySelector("div.codiceCont");
  const ul = container.querySelector("ul.codiceL");
  for (let i = 0; i < dictionaryCode.length; i++) {
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

    // ... (il tuo codice che definisce le variabili va bene)
    const divForm = li.querySelector("div.form");
    const labelPlaceholder = li.querySelector("label.placeholder");
    const codici = li.querySelectorAll("label.codiceSwitch");

    divForm.addEventListener("click", (e) => {
      // L'elemento esatto che è stato cliccato1
      const target = e.target;

      // --- CASO 1: Apertura iniziale ---
      // Se il placeholder è ancora visibile, lo nascondiamo e mostriamo tutte le opzioni.
      if (!labelPlaceholder.classList.contains("placeHolderNone")) {
        labelPlaceholder.classList.add("placeHolderNone");
        codici.forEach((label) => {
          label.classList.add("codiceSwitchActive");
        });
        return; // Usciamo, il lavoro per questo click è finito.
      }

      // --- CASO 2: Riaprire le opzioni ---
      // Se clicchiamo sull'elemento che è GIÀ selezionato (ha la classe 'codiceSelect').
      if (target.classList.contains("codiceSelect")) {
        // Rimuoviamo lo stato di "selezionato".
        target.classList.remove("codiceSelect");
        // E mostriamo di nuovo tutte le opzioni.
        codici.forEach((label) => {
          label.classList.add("codiceSwitchActive");
        });
        return; // Usciamo.
      }

      // --- CASO 3: Selezionare una nuova opzione ---
      // Se clicchiamo su uno dei label visibili (che non è già selezionato).
      if (target.classList.contains("codiceSwitchActive")) {
        // 1. "Resettiamo" tutti i label nascondendoli.
        codici.forEach((label) => {
          label.classList.remove("codiceSwitchActive");
          label.classList.remove("codiceSelect"); // Rimuoviamo per pulizia
        });

        // 2. Mostriamo e marchiamo come "selezionato" solo quello cliccato.
        target.classList.add("codiceSwitchActive");
        target.classList.add("codiceSelect");
      }
    });
  }

  // --- INIZIO SCRIPT PER DISEGNARE LE LINEE (VERSIONE CON RESIZEOBSERVER) ---

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
    const resizeObserver = new ResizeObserver(() => {
      // piccolo ritardo per dare tempo a layout/transizioni
      setTimeout(drawAllLines, 50);
    });

    resizeObserver.observe(containerToObserve);
  } else {
    console.error("'.codice-wrapper' non trovato");
  }

  // --- INIZIO LOGICA TIMER ---

  let timerIntervalId = null; // Variabile per tenere traccia dell'intervallo del timer
  let preStartIntervalId = null; // Variabile per tenere traccia dell'intervallo di preavviso
  // Funzione per formattare il tempo (es: 5 -> "05")
  const formatTime = (num) => num.toString().padStart(2, "0");

  // Funzione principale che gestisce il timer
  function startTimer() {
    const timerDisplay = document.querySelector(".codiceTime span");
    const allSwitches = document.querySelectorAll("li.codiceLi");
    if (!timerDisplay) {
      console.error("Elemento display del timer non trovato!");
      return;
    }

    if (!timerDisplay || allSwitches.length === 0) {
      console.error("Elemento del timer o switch del gioco non trovati!");
      return;
    }

    // <<< MODIFICA QUI: Applica la classe a OGNI switch >>>
    allSwitches.forEach((sw) => sw.classList.add("placeHolderPreCaunt"));

    // --- FASE 1: Countdown di preparazione ---
    let preStartSeconds = 5; //  secondi di preavviso
    timerDisplay.classList.add("codiceFpre");
    timerDisplay.textContent = `Inizio tra ${preStartSeconds}...`;
    timerDisplay.style.color = "#ffc107"; // Un colore per l'avviso

    preStartIntervalId = setInterval(() => {
      const timerDisplay = document.querySelector(".codiceTime span");
      if (!timerDisplay) {
        clearInterval(preStartIntervalId);
        return; // Se il display non c'è più, ferma tutto e esci.
      }
      preStartSeconds--;
      if (preStartSeconds > 0) {
        timerDisplay.textContent = `Inizio tra ${preStartSeconds}...`;
      } else {
        clearInterval(preStartIntervalId); // Ferma il countdown di preparazione
        runMainCountdown(timerDisplay, allSwitches); // Avvia il timer principale
      }
    }, 1000);
  }

  // Funzione che gestisce il countdown principale da 1 minuto
  function runMainCountdown(timerDisplay, allSwitches) {
    allSwitches.forEach((sw) => sw.classList.remove("placeHolderPreCaunt"));
    timerDisplay.classList.remove("codiceFpre");

    let totalSeconds = 60; // 1 minuto
    timerDisplay.textContent = "01-00";
    timerDisplay.style.color = ""; // Ripristina il colore originale
    // Avvia il timer e salva il suo ID per poterlo fermare dopo
    timerIntervalId = setInterval(() => {
      totalSeconds--;

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      timerDisplay.textContent = `${formatTime(minutes)}-${formatTime(
        seconds
      )}`;

      if (totalSeconds <= 0) {
        clearInterval(timerIntervalId); // Ferma il timer
        timerDisplay.textContent = "00-00";
        timerDisplay.style.color = "red";
        // Qui puoi aggiungere la logica di "Game Over"
        const section = document.querySelector("section.codiceS");
        if(section){
        const gameOverArt = document.createElement("article");
        gameOverArt.classList.add("artSubmit", "boom");
        gameOverArt.innerHTML = `
        <h2 class="boomH2">YOU LOSE</h2>
          <p>Riprova a disinnescare la bomba .</p>
          <button class="buttonSubmit" id="buttonSubmit">Torna a Games</button>
          `;
        const buttonSubmit = gameOverArt.querySelector("#buttonSubmit");
        buttonSubmit.addEventListener("click", () => page.show("/games"));
        section.appendChild(gameOverArt);
      }
    }
    }, 1000);
  }

  // Avvia tutto il processo del timer
  startTimer();

  // --- RESTITUISCI LA FUNZIONE DI CLEANUP ---
  // Questa è la parte cruciale per una SPA.
  // Restituiamo una funzione che page.js potrà chiamare
  // per fermare il nostro setInterval quando l'utente cambia pagina.
  return () => {
    if (preStartIntervalId) {
      clearInterval(preStartIntervalId);
      console.log("Timer di pre-start fermato.");
    }
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      console.log("Timer del gioco fermato.");
    }
  };
}
