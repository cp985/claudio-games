import { page } from "./page-route.js";
import trovailcodice from "../../assets/img/trovailcodice.webp";
import sassocartaforbice from "../../assets/img/sassocartaforbice.webp";
import preViewScf1 from "../../assets/img/scf1.webp";
import preViewScf2 from "../../assets/img/scf2.webp";
import ordinaleparole from "../../assets/img/ordina-le-parole.webp";
import words1 from "../../assets/img/words1.webp";
import words2 from "../../assets/img/words2.webp";

//Game Dictionary

class Game {
  constructor(
    title,
    description,
    playDescription,
    imageUrl,
    modeScreen,
    link,
    preView1,
    preView2
  ) {
    this.title = title;
    this.description = description;
    this.playDescription = playDescription;
    this.imageUrl = imageUrl;
    this.modeScreen = modeScreen;
    this.link = link;
    this.preView1 = preView1;
    this.preView2 = preView2;
  }
}

const gamesDatab = {
  sassocartaforbice: new Game(
    "Sasso Carta Forbice",
    "Il classico gioco di sasso, carta e forbice...",
    "Due giocatori si sfidano in un classico gioco di sasso, carta e forbice. Ogni giocatore sceglie una delle tre opzioni e il vincitore viene determinato dalle regole del gioco (Carta batte sasso, sasso batte forbice, forbice batte carta).",
    sassocartaforbice,
    "Per ottenere un'esperienza ottimale, gioca in modalità orizzontale.",
    "sasso-carta-forbice",
    preViewScf1,
    preViewScf2
  ),

  trovailcodice: new Game(
    "Trova il Codice",
    "Un gioco di logica e tanta fortuna...",
    "Il giocatore deve indovinare una serie di codici per disinnescare la bomba.Ad ogni codice errato il timer diminuirà....sceglili con attenzione!.",
    trovailcodice,
    "Per ottenere un'esperienza ottimale, gioca in modalità orizzontale.",
    "trova-il-codice",
    "#",
    "#"
  ),
  ordinaleparole: new Game(
    "Ordina le Parole",
    "Un gioco di parole e conoscenza...",
    "Il giocatore dovrà ordinare una serie di parole per completare una frase tratta da film,libri e citazioni personaggi famosi.Trova la posizione di ogni singola parola per arrivare alla soluzione..",
    ordinaleparole,
    "Per ottenere un'esperienza ottimale, gioca in modalità orizzontale.",
    "ordina-le-parole",
    words1,
    words2
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
      const labels = document.querySelectorAll("ul.gamesList label");
      const label = hoveredLi.querySelector("label");
      labels.forEach((lbl) => {
        lbl.classList.remove("label-selected");
      });
      if (!label) {
        return;
      } else {
        label.classList.add("label-selected");
      }
      if (input && input.id) {
        const id = input.id;
        const objGame = id.replaceAll("-", "");
        const article = document.querySelector(`article.game-article`);
        const imgGame = document.querySelector(
          "section.game-img div.figure div.img"
        );
        const sectImgGame = document.querySelector("section.game-img");

        if (article && imgGame) {
          article.classList.add("contentLoading");
          sectImgGame.classList.add("contentLoading");

          let key = gamesDatab[objGame];

          setTimeout(() => {
            article.innerHTML = `
            <h2>${key.title}</h2>
            <p>${key.description}</p>
            <p><span class="desc"> Descrizione:</span> ${key.playDescription}</p>
            <p style="color: var(--v);text-decoration: underline var(--colore-accento); font-weight: 700">${key.modeScreen}</p>
            <button  class="btn-play">Play</button>
          `;
            imgGame.style.backgroundImage = `url(${key.imageUrl})`;
            imgGame.alt = key.title;

            let divCont = sectImgGame.querySelector("div.gameCont");
            if (!divCont) {
              divCont = document.createElement("div");
              divCont.classList.add("gameCont");
              divCont.innerHTML = `
              <h3 class="gameH3">Preview:</h3>
              <div class="gameContImages">
             <div class="gameContImg"><div style="background-image:url('${key.preView1}')"; class="gameImg1" ></div></div>
             <div class="gameContImg"><div style="background-image:url('${key.preView2}')"; class="gameImg2" ></div></div>
            </div>
             `;
              sectImgGame.appendChild(divCont);
            } else {
              const img1 = divCont.querySelector("div.gameImg1");
              const img2 = divCont.querySelector("div.gameImg2");
              img1.style.backgroundImage = `url(${key.preView1})`;
              img2.style.backgroundImage = `url(${key.preView2})`;
            }

            // -----------btn handler
            const gameSec = document.querySelector("section.gamePage");
            if (gameSec) {
              gameSec.addEventListener("pointerup", (event) => {
                const clickedBtn = event.target.closest("button.btn-play");
                if (!clickedBtn) {
                  return;
                }

                const link = key.link;
                if (link) {
                  console.log(key.id);

                  const gamePath = `/${link}`;
                  page.show(gamePath);
                } else {
                  return;
                }
              });
            } else {
              return;
            }
            // ------------
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
