class TheCode {
    constructor(id,numeriArr,img) {
        this.id=id;
        this.numeriArr=numeriArr;
        this.img=img;
    }
}   
let lettera=()=> {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const index = Math.floor(Math.random() * alphabet.length);
  return alphabet[index];
}
let numero =()=>{
let arr=[];

for(let i = 0 ; i < 5; i++){
let n  = Math.floor(Math.random() * 100);
arr.push(n);
}
return arr;
}
console.log(numero());


const dictionaryCode=[
new TheCode(1,1,"#"),
new TheCode(2,2,"#"),
new TheCode(3,3,"#"),
new TheCode(4,4,"#"),
new TheCode(5,5,"#"),



];





// const ul = querySelector(".codiceL");

// document.createElement("li");

// li.classList.add("codiceLi");



