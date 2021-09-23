class Router{
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
      default : 
        this.DOM.innerHTML = "404";
        break;
    }
  }
}