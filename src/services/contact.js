import { page } from "./page-route.js";

export function validateForm() {
  const form = document.getElementById("form");
  const submitButton = document.getElementById("button-submit");
  const invalidH3 = form.querySelector("h3.invalidH3");
  if (!form || !submitButton) return;

  submitButton.addEventListener("click", function () {
    form.classList.add("submitted");

    let isFormValid = true;

    form.querySelectorAll("span.invalid").forEach((span) => {
      span.style.display = "none";
    });

    const inputs = form.querySelectorAll("input[required], textarea[required]");
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        isFormValid = false;
        const spanId = `span${
          input.id.charAt(0).toUpperCase() + input.id.slice(1)
        }`;
        const errorSpan = document.getElementById(spanId);
        if (errorSpan) {
          errorSpan.style.display = "inline";
          invalidH3.style.display = "block";
        }
      }
    });

    if (!isFormValid) {
      console.log("Form non valido. Controlla i campi evidenziati.");
      return;
    }

    console.log("Form valido. Invio in corso...");
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    showSuccessMessage();
    form.reset();
    form.classList.remove("submitted");
    form.querySelectorAll("span.invalid").forEach((span) => {
      span.style.display = "none";
    });
  });
}

function showSuccessMessage() {
  const main = document.querySelector("main.contact-page");
  if (!main || main.querySelector(".artSubmit")) return;

  let divS = document.createElement("div");
  divS.innerHTML = `
    <article class="artSubmit">
      <h2>Il tuo messaggio è stato inviato con successo!</h2>
      <p>Grazie per averci contattato, ti risponderemo al più presto.</p>
      <button class="buttonSubmit" id="buttonSubmit">Torna alla Home</button>
    </article>
  `;
  const buttonSubmit = divS.querySelector("#buttonSubmit");
  buttonSubmit.addEventListener("click", () => page.show("/"));
  main.appendChild(divS);
}
