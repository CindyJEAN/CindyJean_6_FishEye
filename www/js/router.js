import {init as dataManagerInit}  from "./dataManager.js";
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
	const {page, args} = extract();
	showPage(page, args);
}

//On actions on the window (back, forward), the extract function is called, 
//to extract the page and arguments of the url, and show the page
window.onpopstate = function(event) {
  const {page, args} = extract();
	showPage(page, args);
};

/**
 * extractPageFromUrl takes the url and returns the page and the arguments 
 * of the url as an object
 *
 * @return  {Object} page to show, args of the page to show
 */
const extract = function extractPageFromUrl(){
	let [page, args] = window.location.hash.slice(1).split("/");
	if (page === "") page = "index";
	// const parsedArgs = parseInt(args);
	return {page, args};
}

/**
 * [showPage description]
 *
 * @param   {String}  page  
 * @param   {String}  args  
 *
 */
const showPage = function (page, args) {
	DOM.innerText= "";
	switch (page) {
		case "index":
			new Index(DOM);
			break;
		case "photographer":
			new PhotographerPage(DOM, parseInt(args));
			break;
		case "lightbox":
			const [idMedia, photographerId] = args.split("/")
			new Lightbox(DOM, {idMedia, photographerId});
			break;
		default:
			DOM.innerHTML = "404";
			break;
	}
};

/**
 * updates history and calls showPage
 *
 * @param   {String}  page  page to show
 * @param   {Number}  [args]  potential args for the page
 *
 * @return  {void}        
 */
window.changePage = function (page, args){
	//changes the url
	history.pushState({}, "", "#"+page+(args ? "/"+args : ""));
	showPage(page, args);
}
