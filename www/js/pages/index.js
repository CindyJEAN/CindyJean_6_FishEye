import Profile from "../composants/profile.js";
import Header from "../composants/header.js";
import { getPhotographersTags, getPhotographersList} from "../dataManager.js";
export default class Index{
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget    [domTarget description]
   */
  constructor(domTarget){
    this.activeTags = [];
    this.DOM = domTarget;
    this.tags = [];
    this.render();
  }

  async render(){
    this.DOM.innerText="";
    if (this.tags.length === 0) this.tags = await getPhotographersTags();
    const profiles = await getPhotographersList(this.activeTags);

    new Header(this.DOM, this.tags, this.clickOnTag.bind(this));

    const main = document.createElement("main");
    this.DOM.appendChild(main);
    main.className = "index-main";
    main.innerHTML = `<h1>Nos photographes</h1>`;
    profiles.forEach(profilePhotographer => {
      new Profile(main, profilePhotographer, "index");
    });
  }

  clickOnTag(tagName) {
    const position = this.activeTags.indexOf(tagName);
    if (position === -1) this.activeTags.push(tagName);
    else this.activeTags.splice(position, 1);
    console.log(tagName);
    this.render()
  }
}
