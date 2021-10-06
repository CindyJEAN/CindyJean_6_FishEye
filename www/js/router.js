import DataManager from "./dataManager.js"
import PhotographerPage from "./pages/photographer-page.js";
import Index from "./pages/index.js";


class Router{
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   */
  constructor(domTarget, dataSrc){
    this.DOM = domTarget;
    window.changePage = this.showPage;
    this.dataManager = new DataManager(dataSrc);
    this.showPage();

  }

  showPage(page){
    if (page === undefined) page = window.location.hash.slice(1);
    switch (page) {
      case "" : 
        new Index(this.DOM, this.dataManager);
        break;
      case "photographer-page.html":
        new PhotographerPage(this.DOM, this.dataManager);
        break;
      default : 
        this.DOM.innerHTML = "404";
        break;
    }
  }
}

window.onload = function(){
  new Router(document.body, "./data.json");
}