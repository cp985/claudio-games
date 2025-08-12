import { page } from "./page-route.js";
import trovailcodice from "../../assets/img/trovailcodice.webp";
import sassocartaforbice from "../../assets/img/sassocartaforbice.webp";
import ordinaleparole from "../../assets/img/ordina-le-parole.webp";

//GAME LINK HANDLER
export function gamesHandlerPage() {
  const gameUl = document.querySelector("ul.gamesList");
  if (gameUl) {
    gameUl.addEventListener("pointerup", (event) => {
      const clickedLi = event.target.closest("li.game");
      if (!clickedLi) {
        return;
      }

      const input = clickedLi.querySelector('input[type="radio"]');
      if (input && input.id) {
        console.log(input.id);

        const id = input.id;
        const gamePath = `/${id}`;
        page.show(gamePath);
      } else {
        return;
      }
    });
  } else {
    return;
  }
}
//Game Dictionary

class Game {
  constructor(title, description, playDescription, imageUrl, players) {
    this.title = title;
    this.description = description;
    this.playDescription = playDescription;
    this.imageUrl = imageUrl;
    this.players = players;
  }
}

const gamesDatab = {
  sassocartaforbice: new Game(
    "Sasso Carta Forbice",
    "Il classico gioco di sasso, carta e forbice...",
    "Due giocatori si sfidano in un classico gioco di sasso, carta e forbice. Ogni giocatore sceglie una delle tre opzioni e il vincitore viene determinato dalle regole del gioco (Carta batte sasso, sasso batte forbice, forbice batte carta).",
    sassocartaforbice,
    "vs IA"
  ),

  trovailcodice: new Game(
    "Trova il Codice",
    "Un gioco di logica e tanta fortuna...",
    "I giocatori devono indovinare un codice segreto composto da una sequenza di numeri. Avrai un massimo di tentativi per ogni codice,se li esaurirai l'allarme scatterà.",
    trovailcodice,
    "1"
  ),
  ordinaleparole: new Game(
    "Ordina le Parole",
    "Un gioco di parole e conoscenza...",
    "Il giocatore dovrà ordinare una serie di parole per completare una frase tratta da film,libri,personaggi famosi. Allo scadere del tempo la frase si cancellerà e non sarà più possibile decifrarla...",
    ordinaleparole,
    "1"
  ),
};

//PREVIEW GAME HANDLER
export function previewGameHandlerPage() {
  const gameUl = document.querySelector("ul.gamesList");
  if (gameUl) {
    gameUl.addEventListener("pointerover", (event) => {
      const hoveredLi = event.target.closest("li.game");
      if (!hoveredLi) {
        return;
      }
      const input = hoveredLi.querySelector('input[type="radio"]');
      if (input && input.id) {
        console.log(input + " " + input.id);
        const id = input.id;
        const objGame = id.replaceAll("-", "");
        const article = document.querySelector(`article.game-article`);
        const imgGame = document.querySelector("section.game-img figure img");
        const sectImgGame = document.querySelector("section.game-img");

        if (article && imgGame) {
          article.classList.add("contentLoading");
          sectImgGame.classList.add("contentLoading");

          let key = gamesDatab[objGame];

          setTimeout(() => {
            article.innerHTML = `
            <h2>${key.title}</h2>
            <p>${key.description}</p>
            <p>${key.playDescription}</p>
            <p>Giocatori: ${key.players}</p>
          `;
            imgGame.src = key.imageUrl;
            imgGame.alt = key.title;
            article.classList.remove("contentLoading");
            sectImgGame.classList.remove("contentLoading");
          }, 500);
        } else {
          console.error("Article not found");
        }
      }
    });
  }
}
