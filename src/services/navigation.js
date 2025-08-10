export function createNavigation() {
  const navLinks = [
    { path: '/', text: 'Home' },
    { path: '/news', text: 'News' },
    { path: '/games', text: 'Games' },
    { path: '/contact', text: 'Contact' },
    { path: '/ggg', text: '???' },
  ];
  
  const header = document.getElementById('main-header');
  if (!header) return;

  const linksHTML = navLinks.map(link => {
    // Logica di costruzione dell'URL a prova di errore
    let baseUrl = __BASE_URL__ || ''; // Assicura che non sia undefined
    let path = link.path;
    
    // Evita doppi slash se la base ha uno slash e il percorso anche
    if (baseUrl.endsWith('/') && path.startsWith('/')) {
      path = path.substring(1);
    }
    
    // Caso speciale per la home
    if (path === '/') {
        // L'URL per la home è semplicemente la base, o '/' se la base è vuota
        return `<li class="menu"><a class="nav-link link" href="${baseUrl || '/'}">${link.text}</a></li>`;
    }

    return `<li class=" menu"><a class="nav-link link" href="${baseUrl}${path}">${link.text}</a></li>`;
  }).join('');

  header.innerHTML = `<nav class="main-nav"><ul class="list">${linksHTML}</ul></nav>`;
}