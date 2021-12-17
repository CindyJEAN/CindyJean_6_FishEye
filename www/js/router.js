import { init as dataManagerInit } from "./dataManager.js";
import PhotographerPage from "./pages/photographerPage.js";
import Index from "./pages/index.js";
import Lightbox from "./pages/lightbox.js";

var DOM;

window.onload = () => init(document.body, "./data.json");

/**
 * inits the website
 *
 * @param   {HTMLElement}  domTarget
 * @param   {Object}  dataSrc
 *
 */
function init(domTarget, dataSrc) {
  DOM = domTarget;
  dataManagerInit(dataSrc);
  const { page, photographerId, mediaId } = extract();
  showPage(page, photographerId, mediaId);
}

//On actions on the window (back, forward), the extract function is called,
//to extract the page and arguments of the url, and show the page
window.onpopstate = function () {
  const { page, photographerId, mediaId } = extract();
  showPage(page, photographerId, mediaId);
};

/**
 * extractPageFromUrl takes the url and returns the page and the arguments
 * of the url as an object
 *
 * @return  {Object} page to show, args of the page to show
 */
const extract = function extractPageFromUrl() {
  const args = window.location.hash.slice(1).split("/");
  let page = args[0];
  const photographerId = args[1];
  const mediaId = args[2];
  if (page === "") page = "index";
  return { page, ...{ photographerId, mediaId } };
};

/**
 * Swicth page depending on arguments
 *
 * @param   {String}  page
 * @param   {String}  photographerId  l'id du photographe ou le tag sélectionné
 * @param   {String}  mediaId
 *
 */
const showPage = function (
  page,
  photographerId = undefined,
  mediaId = undefined
) {
  DOM.innerText = "";
  const selectedTag = photographerId;
  switch (page) {
    case "index":
      new Index(DOM, selectedTag);
      break;
    case "photographer":
      new PhotographerPage(DOM, parseInt(photographerId));
      break;
    case "lightbox":
      new Lightbox(DOM, { photographerId, mediaId });
      break;
    default:
      DOM.innerHTML = /*HTML*/ `
			<h1>404 error</h1>
			<p>Page not found</p>
			`;
      DOM.className = "errorPage";
      break;
  }
};

/**
 * updates history and calls showPage
 *
 * @param   {String}  page  page to show
 * @param   {String}  [photographerId]
 * @param   {String}  [mediaId]
 *
 * @return  {void}
 */
// @ts-ignore
window.changePage = function (
  page,
  photographerId = undefined,
  mediaId = undefined
) {
  //changes the url
  let newUrl = "#" + page;
  if (photographerId) {
    newUrl += "/" + photographerId;
    if (mediaId) newUrl += "/" + mediaId;
  }
  history.pushState({}, "", newUrl);
  showPage(page, photographerId, mediaId);
};
