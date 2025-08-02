// File: public/redirect.js

(function() {
  // Il nome del tuo repository (la sottocartella del sito)
  const repoName = '/claudio-games/';

  // Ottieni il percorso completo a cui l'utente stava cercando di accedere
  const path = location.pathname;

  // Usa sessionStorage per passare il percorso alla pagina principale.
  // È più pulito che usare i parametri dell'URL.
  // Salviamo solo la parte del percorso DOPO il nome del repository.
  // Esempio: da "/claudio-games/about" salviamo "/about"
  const redirectPath = path.replace(repoName, '/');
  sessionStorage.setItem('redirect', redirectPath);

  // Reindirizza alla radice della tua applicazione
  location.replace(location.origin + repoName);
})();