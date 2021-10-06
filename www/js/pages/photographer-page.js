import Header from "../composants/header.js";
import Button from "../composants/button.js";
import Profile from "../composants/profile.js";
import Dropdown from "../composants/dropdown.js";
import PhotographerInfo from "../composants/photographer-info.js";
import Modal from "../composants/modal.js";
export default class PhotographerPage{
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget    [domTarget description]
   */
  constructor(domTarget, dataManager){
    this.DOM = domTarget;
    this.data = dataManager;
    this.id = 82;
    this.render();
  }

  async render(){
    const profileData = await this.data.getPhotographerById(this.id);

    new Header(this.DOM, null, null);
    // document.body.appendChild(indexMain);

    const main = document.createElement("main");
    this.DOM.appendChild(main);

    new Button(main, "Contactez-moi");
    // new Profile(main, profiles);
    new Dropdown(main);
    new PhotographerInfo(main);
    new Modal(main, "lightboxModal");
    // new WorkPhoto(main);
  }
}