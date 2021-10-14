import {init as dataManagerInit}  from "./dataManager.js";
import PhotographerPage from "./pages/photographer-page.js";
import Index from "./pages/index.js";

var DOM;

window.onload = () => init(document.body, "./data.json");
function init(domTarget, dataSrc) {
	DOM = domTarget;
	dataManagerInit(dataSrc);
	const {page, args} = extract();
	showPage(page, args);
}
window.onpopstate = function(event) {
  const {page, args} = extract();
	showPage(page, args);
};

const extract = function extractPageFromUrl(){
	let [page, args] = window.location.hash.slice(1).split("/");
	if (page === "") page = "index";
	const parsedArgs = parseInt(args);
	return {page, args : isNaN(parsedArgs) ? undefined : parsedArgs};
}

const showPage = function (page, args) {
	DOM.innerText= "";
	switch (page) {
		case "index":
			new Index(DOM);
			break;
		case "photographer":
			new PhotographerPage(DOM, args);
			break;
		default:
			DOM.innerHTML = "404";
			break;
	}
};

/**
 * [changePage description]
 *
 * @param   {String}  page  [page description]
 * @param   {Number}  [args]  [args description]
 *
 * @return  {void}        update history and call showPage
 */
window.changePage = function (page, args){
	//changer la barre d'adresse
	history.pushState({}, "", "#"+page+(args ? "/"+args : ""));
	showPage(page, args);
}
