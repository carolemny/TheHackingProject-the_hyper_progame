// imports

import "bootstrap";
import "../sass/style.scss";
import { routes } from "./routes";

// code routeur

let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  const pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute()); // changement d'url
window.addEventListener("DOMContentLoaded", () => setRoute()); // chargement du DOM
