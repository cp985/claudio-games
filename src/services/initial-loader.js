// File: src/services/initial-loader.js (Versione con delay garantito)

export function handleInitialLoad() {
  const loader = document.querySelector('.loader');

  if (!loader) {
    console.warn('Initial loader element not found.');
    return;
  }

  // Creiamo due promesse separate.

  // Promessa 1: Si risolve dopo 3 secondi.
  const minimumTimePromise = new Promise(resolve => {
    setTimeout(resolve, 2000); // 2000 millisecondi = 3 secondi
  });

  // Promessa 2: Si risolve quando la pagina è completamente caricata.
  const pageLoadedPromise = new Promise(resolve => {
    window.addEventListener('load', resolve);
  });

  // Promise.all attende che TUTTE le promesse nell'array siano state risolte.
  // In questo caso, attenderà sia la fine del timer, sia il caricamento della pagina.
  Promise.all([minimumTimePromise, pageLoadedPromise]).then(() => {
    // Quando entrambe le condizioni sono soddisfatte, nascondiamo il loader.
    loader.classList.add('hidden');
    console.log('Initial loader hidden after minimum time and page load.');
  });
}