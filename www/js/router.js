import {init as dataManagerInit}  from "./dataManager.js";
import PhotographerPage from "./pages/photographer-page.js";
import Index from "./pages/index.js";

var DOM;

window.onload = () => init(document.body, "./data.json");
function init(domTarget, dataSrc) {
	DOM = domTarget;
	dataManagerInit(dataSrc);
	changePage();
}

const changePage = function showPage(page) {
	if (page === undefined) page = window.location.hash.slice(1);
	switch (page) {
		case "":
			new Index(DOM);
			break;
		case "photographer-page.html":
			new PhotographerPage(DOM);
			break;
		default:
			DOM.innerHTML = "404";
			break;
	}
};
