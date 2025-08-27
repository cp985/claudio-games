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
  console.log(arr1);
  console.log(arr2);
  console.log(arr3);
  console.log(arr4);
  console.log(arr5);

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
<label class="placeholder" for="placeholder${i}">&#9746;&#9746;&#9746;&#9746;
<input type="radio" name="codice${i}" id="placeholder${i}" value="${dictionaryCode[i].code[0]}">
</label>
<label class="codiceSwitch" for="codice${i}-0">${dictionaryCode[i].code[0]}
<input type="radio" name="codice${i}" id="codice${i}-0" value="${dictionaryCode[i].code[0]}">
</label>
<label class="codiceSwitch" for="codice${i}-1">${dictionaryCode[i].code[1]}
<input type="radio" name="codice${i}" id="codice${i}-1" value="${dictionaryCode[i].code[1]}">
</label>
<label class="codiceSwitch" for="codice${i}-2">${dictionaryCode[i].code[2]}
<input type="radio" name="codice${i}" id="codice${i}-2" value="${dictionaryCode[i].code[2]}">
</label>
<label class="codiceSwitch" for="codice${i}-3">${dictionaryCode[i].code[3]}
<input type="radio" name="codice${i}" id="codice${i}-3" value="${dictionaryCode[i].code[3]}">
</label>
<label class="codiceSwitch" for="codice${i}-4">${dictionaryCode[i].code[4]}
<input type="radio" name="codice${i}" id="codice${i}-4" value="${dictionaryCode[i].code[4]}">
</label>
</div>
</div>
`;

    li.classList.add("codiceLi");
    ul.appendChild(li);

    const divForm = li.querySelector("div.form");
    const divSwitch = li.querySelector("div.switch");
    const labelPlaceholder = li.querySelector("label.placeholder");
    const codici = li.querySelectorAll("label.codiceSwitch");
    const liCodice = document.querySelector("li.codiceLi");

    divForm.addEventListener("click", (e) => {
      e.preventDefault();
      let target = e.target;
      if (divSwitch) {
        labelPlaceholder.classList.add("placeHolderNone");
        codici.forEach((label) => {
          label.classList.toggle("codiceSwitchActive");
        });
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

    svg.innerHTML = ""; // Pulisce UNA volta sola
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

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", startX);
      line.setAttribute("y1", startY);
      line.setAttribute("x2", endX);
      line.setAttribute("y2", endY);
      line.setAttribute("class", "connectorLi-line");
      svg.appendChild(line);
    }

    // --- Disegna linee dal footer a ciascun li ---
    const xFooter = footerRect.left + footerRect.width / 2 - svgRect.left;
    const yFooter = footerRect.top - svgRect.top;

    switches.forEach((li) => {
      const liRect = li.getBoundingClientRect();
      const xLi = liRect.left + liRect.width / 2 - svgRect.left;
      const yLi = liRect.bottom - svgRect.top;

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", xFooter);
      line.setAttribute("y1", yFooter);
      line.setAttribute("x2", xLi);
      line.setAttribute("y2", yLi);
      line.setAttribute("class", "connectorFooter-line");
      svg.appendChild(line);
    });
  }
  // Seleziona il contenitore che racchiude UL + SVG
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
}
