

function shuffleArr(array){  
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
return arr;
}

export function textArray(){
    const pTesto = document.querySelector("p.parolePtesto");
const frase = pTesto.dataset.text;
const arr1=frase.split(" ");
const arr2=[...arr1];
const arrShuffled = shuffleArr(arr2);
console.log(arrShuffled);
const spanTesto = document.createElement("span");
  if (!pTesto) {
    console.error("Il paragrafo con classe 'parolePtesto' non è stato trovato!");
    return;
  }
spanTesto.classList.add("testo");
if (pTesto.children.length > 0) {
      return;
  }else{
arrShuffled.forEach(element => {
    const span = document.createElement("span");
    span.classList.add("testo");
    span.textContent=element;
    pTesto.appendChild(document.createTextNode(' '));
    pTesto.appendChild(span);
})
}



}


 