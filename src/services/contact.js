function submitHandler(event) {
  event.preventDefault();
  let form = event.target;

  let data = new FormData(form);

  for (let dato of data.entries()) {
    console.log(dato[0] + ": " + dato[1]);
    console.log("-------------------------------");
  }
  form.reset();
}

document.addEventListener("submit", function (event) {
  if (event.target && event.target.id === "form") {
    submitHandler(event);
    console.log("Form submitted successfully.");
    const main = document.querySelector("main.contact-page");
    let divS = document.createElement("div");
    
    divS.innerHTML = `
    <article class="artSubmit">
    <h2>Il tuo messaggio è stato inviato con successo!</h2>
    <p>Grazie per averci contattato, ti risponderemo al più presto.</p>
    <button class="buttonSubmit" id="buttonSubmit">Torna alla Home</button
    </article>
    `;
const buttonSubmit = divS.querySelector("#buttonSubmit");
 
buttonSubmit.addEventListener("click", function() {
    window.location.href = "/";
})


main.appendChild(divS);

    
  }
});
