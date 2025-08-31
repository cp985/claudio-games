//css imp
import "./style/general.css";
import "./style/normalizeCss.css";
import "./style/resetcss.css";
import "./style/body.background.css";
import "./style/news.css";
import "./style/first-loader.css";
import "./style/loader.css";
import "./style/contact.css";
import "./style/ggg.css";
import "./style/games.css";
import "./style/scf.css";
import "./style/parole.css";
import "./style/codice.css";
//js imp
import { startRouter } from "./services/page-route.js";
import { handleInitialLoad } from "./services/initial-loader.js";
import { createNavigation } from "./services/navigation.js";
import "./services/contact.js";
import "./services/games.js"
import "./services/scf.js";
import "./services/parole.js"
import "./services/codice.js"



createNavigation();

const repoName = "/claudio-games";

const redirect = sessionStorage.getItem("redirect");

if (redirect) {
  sessionStorage.removeItem("redirect");

  const fullPath = repoName + redirect;

  history.replaceState(null, null, fullPath);
}
handleInitialLoad();
startRouter();


console.log("Application initialized.");


if (module.hot) {
  module.hot.accept();
}
