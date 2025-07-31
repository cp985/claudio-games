import { gsap } from "gsap";


export function animateLogo() {
  const logo = document.getElementById("animated-logo");
  
  if (logo && logo.querySelectorAll("span").length === 0) { // Esegui solo se non è già stato inizializzato
    console.log("Logo: Initializing and starting animations.");

    const cleanText = "☺.PLAY DIFFERENT.☺";
    logo.innerHTML = ""; // Pulisci prima di aggiungere

    cleanText.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.position = "relative";
      if (char === " ") {
        span.style.width = "0.5em";
      }
      logo.appendChild(span);
    });

    const letters = logo.querySelectorAll("span");
    letters.forEach((letter, index) => {
      if (letter.textContent === " ") return;

      const yMovement = 10 + (index % 5) * 2;
      const xMovement = 5 + (index % 3) * 3;
      const rotateAmount = 10 + (index % 8) * 5;
      const baseDelay = index * 0.08;

      gsap.to(letter, { y: yMovement, duration: 1.2 + Math.random() * 0.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: baseDelay });
      gsap.to(letter, { x: xMovement, duration: 1.8 + Math.random() * 0.9, ease: "sine.inOut", repeat: -1, yoyo: true, delay: baseDelay + 0.2 });
      gsap.to(letter, { rotation: rotateAmount, duration: 2.2 + Math.random() * 1.1, ease: "sine.inOut", repeat: -1, yoyo: true, delay: baseDelay + 0.4 });
      gsap.to(letter, { scale: 1.1 + (index % 4) * 0.1, duration: 1.5 + Math.random() * 0.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: baseDelay + 0.6 });
    });
  }
}

/**
 * Funzione per fermare e pulire tutte le animazioni GSAP attive sul logo.
 * Fondamentale da chiamare prima di lasciare la pagina.
 */
export function killLogoAnimations() {
  // Troviamo tutti gli span che stavamo animando
  const letters = document.querySelectorAll("#animated-logo span");
  if (letters.length > 0) {
    console.log("Logo: Killing active animations.");
    gsap.killTweensOf(letters);
  }
}