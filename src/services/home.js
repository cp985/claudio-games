export function imgTranslationX() {
  // Seleziona l'immagine che vuoi animare
  const documentScrolling = document.querySelector("div#content");

  // Aggiungi un event listener per lo scroll
  documentScrolling.addEventListener("scroll", () => {
    const ceoImag = document.querySelector("div.imgCeo");
    const ctoImg = document.querySelector("div.imgCto");
    const dirImg = document.querySelector("div.imgDirector");
    if (!ceoImag) {
      console.log("Elemento non trovato.");
      return; // Ferma l'esecuzione se l'elemento non c'è
    }
    // Calcola la posizione di scroll rispetto all'altezza della pagina
    const scrollPosition = documentScrolling.scrollTop;
    console.log(scrollPosition + "px" + " di scroll");

    let startScroll = 280;
    let endScroll = 620;
    let startScroll2 = 600;
    let endScroll2 = 940;
    let startScroll3 = 920;
    let endScroll3 = 1100;
    if (window.innerWidth < 600) {
      startScroll = 510;
      endScroll = 700;
      startScroll2 = 940;
      endScroll2 = 1250;
      startScroll3 = 1520;
      endScroll3 = 1770;
    }
    const scrollRange = endScroll - startScroll;
    const scrollRange2 = endScroll2 - startScroll2;
    const scrollRange3 = endScroll3 - startScroll3;

    // Calcola il "progresso" dello scroll all'interno del nostro intervallo
    let scrollProgress = (scrollPosition - startScroll) / scrollRange;
    let scrollProgress2 = (scrollPosition - startScroll2) / scrollRange2;
    let scrollProgress3 = (scrollPosition - startScroll3) / scrollRange3;

    // Assicura che il progresso sia compreso tra 0 e 1
    scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);
    scrollProgress2 = Math.min(Math.max(scrollProgress2, 0), 1);
    scrollProgress3 = Math.min(Math.max(scrollProgress3, 0), 1);

    // Definisci le larghezze minima e massima
    const minWidth = 10; // La larghezza iniziale in percentuale
    const maxWidth = 100; // La larghezza finale in percentuale
    const opacityStart = 0;
    const opacityEnd = 1;
    // Calcola la nuova larghezza basata sul progresso dello scroll
    const newWidth = minWidth + (maxWidth - minWidth) * scrollProgress;
    const newOpacity =
      opacityStart + (opacityEnd - opacityStart) * scrollProgress;

    const newWidth2 = minWidth + (maxWidth - minWidth) * scrollProgress2;
    const newOpacity2 =
      opacityStart + (opacityEnd - opacityStart) * scrollProgress2;

    const newWidth3 = minWidth + (maxWidth - minWidth) * scrollProgress3;
    const newOpacity3 =
      opacityStart + (opacityEnd - opacityStart) * scrollProgress3;

    // Applica la nuova larghezza all'immagine
    ceoImag.style.width = newWidth + "%";
    ceoImag.style.opacity = newOpacity;

    ctoImg.style.width = newWidth2 + "%";
    ctoImg.style.opacity = newOpacity2;

    dirImg.style.width = newWidth3 + "%";
    dirImg.style.opacity = newOpacity3;
  });
}
