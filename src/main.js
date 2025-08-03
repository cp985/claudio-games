// 1. Importa tutti gli stili necessari
import "./style/general.css";
import "./style/normalizeCss.css";
import "./style/resetcss.css";
import "./style/body.background.css";
import { startRouter } from "./services/page-route.js";

import { createNavigation } from "./services/navigation.js";

createNavigation();

const repoName = "/claudio-games";

const redirect = sessionStorage.getItem("redirect");

if (redirect) {
  sessionStorage.removeItem("redirect");

  const fullPath = repoName + redirect;

  history.replaceState(null, null, fullPath);
}

startRouter();

console.log("Application initialized.");

if (module.hot) {
  module.hot.accept();
}
