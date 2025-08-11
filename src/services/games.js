import { page } from "./page-route.js";

export function gamesHandlerPage() {
  const gameUl = document.querySelector("ul.gamesList");
  if (gameUl) {
    gameUl.addEventListener("click", (event) => {
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
