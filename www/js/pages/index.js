import Profile from "../components/profile.js";
import Header from "../components/header.js";
import { getPhotographersTags, getPhotographersList} from "../dataManager.js";
import Button from "../components/button.js";
export default class Index{
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget    [domTarget description]
   */
  constructor(domTarget, selectedTag){
    this.activeTags = selectedTag === undefined ? [] : [selectedTag];
    this.DOM = domTarget;
    // this.tags = [];
    this.render();
  }

  async render(){
    this.DOM.innerText="";
    const tags = await getPhotographersTags();

    new Header(this.DOM, tags, this.clickOnTag.bind(this));

    
    this.main = document.createElement("main");
    this.DOM.appendChild(this.main);
    // this.main.className = "indexMain";
    this.main.id = "indexMain";

    this.showPhotographers();
  }

  showPhotographers(){
    
    this.main.innerHTML = `<h1>Nos photographes</h1>`;
    //test redirect
    const mainContent = document.createElement("div");
    mainContent.className = "gallery";
    mainContent.id = "indexMainContent";
    this.main.appendChild(mainContent);
    //end test redirect
    const profiles = getPhotographersList(this.activeTags);
    
    profiles.forEach(profilePhotographer => {
      // new Profile(this.main, profilePhotographer, "index");
      new Profile(mainContent, profilePhotographer, "index");
    });
  }

  clickOnTag(tagName, page) {
    // if (page !== "index") {
    //   window.changePage('index');
    // }
    const position = this.activeTags.indexOf(tagName);
    if (position === -1) this.activeTags.push(tagName);
    else this.activeTags.splice(position, 1);
    // console.log(tagName);
    this.showPhotographers();
  }
}

