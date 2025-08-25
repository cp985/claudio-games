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
<div class="codiceId">${dictionaryCode[i].id}</div>
<div class="switch">
<form>
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
</form>
</div>
`
li.classList.add("codiceLi");
ul.appendChild(li);

}


}