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
for(let i =0; i<dictionaryCode.length; i++){
const li =document.createElement("li");
li.innerHTML = `

<div class="switch">
<div class="form  form${i}">
<label for="placeholder${i}">00:00
<input type="radio" name="codice${i}" id="placeholder${i}" value="${dictionaryCode[i].code[0]}">
</label>
<label for="codice${i}-0">${dictionaryCode[i].code[0]}
<input type="radio" name="codice${i}" id="codice${i}-0" value="${dictionaryCode[i].code[0]}">
</label>
<label for="codice${i}-1">${dictionaryCode[i].code[1]}
<input type="radio" name="codice${i}" id="codice${i}-1" value="${dictionaryCode[i].code[1]}">
</label>
<label for="codice${i}-2">${dictionaryCode[i].code[2]}
<input type="radio" name="codice${i}" id="codice${i}-2" value="${dictionaryCode[i].code[2]}">
</label>
<label for="codice${i}-3">${dictionaryCode[i].code[3]}
<input type="radio" name="codice${i}" id="codice${i}-3" value="${dictionaryCode[i].code[3]}">
</label>
<label for="codice${i}-4">${dictionaryCode[i].code[4]}
<input type="radio" name="codice${i}" id="codice${i}-4" value="${dictionaryCode[i].code[4]}">
</label>
</div>
</div>
`
li.classList.add("codiceLi");
ul.appendChild(li);

}

// Esegui questa funzione quando la pagina è completamente caricata,
// così siamo sicuri che tutti gli elementi abbiano le loro dimensioni finali.
window.addEventListener('load',()=>{
setTimeout(drawConnectingLines, 500);
});
// Opzionale: ridisegna le linee se la finestra viene ridimensionata
window.addEventListener('resize', drawConnectingLines);

function drawConnectingLines() {
    // 1. Seleziona gli elementi necessari
    const switches = document.querySelectorAll('li.codiceLi');
    const svg = document.getElementById('svg-connectors');
    const container = document.querySelector('.codice-wrapper');

    // Pulisci l'SVG da linee precedenti (utile per il resize)
    svg.innerHTML = '';

    if (switches.length < 2) {
        return; // Non c'è niente da collegare
    }

    // Ottieni le coordinate del contenitore per calcolare le posizioni relative
    const containerRect = container.getBoundingClientRect();

    // 2. Itera su tutti gli switch tranne l'ultimo
    for (let i = 0; i < switches.length - 1; i++) {
        const startElement = switches[i];
        const endElement = switches[i + 1];

        // Ottieni le dimensioni e posizioni degli elementi
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();

        // 3. Calcola i punti di inizio e fine della linea
        // Le coordinate sono relative all'angolo in alto a sinistra del `container`
        
        // Punto di partenza: centro del bordo destro del primo elemento
        const startX = startRect.right - containerRect.left;
        const startY = startRect.top + (startRect.height / 2) - containerRect.top;

        // Punto di arrivo: centro del bordo sinistro del secondo elemento
        const endX = endRect.left - containerRect.left;
        const endY = endRect.top + (endRect.height / 2) - containerRect.top;

        // 4. Crea un elemento <line> SVG
        // Nota: per SVG si usa `createElementNS`
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        // Imposta gli attributi della linea
        line.setAttribute('x1', startX);
        line.setAttribute('y1', startY);
        line.setAttribute('x2', endX);
        line.setAttribute('y2', endY);
        line.setAttribute('class', 'connector-line'); // Applica lo stile CSS

        // 5. Aggiungi la linea all'SVG
        svg.appendChild(line);
    }
}
}