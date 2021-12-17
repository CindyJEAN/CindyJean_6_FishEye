import Header from "../components/header.js";
import Profile from "../components/profile.js";
import Dropdown from "../components/dropdown.js";
import PhotographerInfo from "../components/photographerInfo.js";
import Media from "../components/media.js";
import {
  getPhotographerById,
  getMediaByPhotographerId,
} from "../dataManager.js";
import Form from "../components/form.js";
export default class PhotographerPage {
  /**
   * @param   {HTMLElement}  domTarget
   */
  constructor(domTarget, id) {
    this.DOM = domTarget;
    this.id = id;
    this.filters = ["Popularité", "Date", "Titre"];
    this.totalLikes = 0;
    this.activeFilter = this.filters[0];
    this.render();
  }

  async render() {
    const profileData = await getPhotographerById(this.id);
    new Header(this.DOM, null, null);
    const main = document.createElement("main");
    this.DOM.appendChild(main);
    main.id = "photographerMain";
    new Profile(main, profileData, "photographer", this.openForm.bind(this));
    new Dropdown(main, this.filters, this.sortMedia.bind(this));

    this.gallery = document.createElement("div");
    main.appendChild(this.gallery);
    this.gallery.className = "gallery";
    this.udpdateGallery();
    this.information = new PhotographerInfo(main, profileData, this.totalLikes);
  }

  /**
   * To update gallery, not all page
   */
  async udpdateGallery() {
    this.gallery.innerText = "";
    const media = await getMediaByPhotographerId(this.id, this.activeFilter);

    media.forEach((medium) => {
      new Media(this.gallery, medium, this.updateLikes.bind(this));
      this.totalLikes += medium.likes;
    });
    this.information.update(this.totalLikes);
  }

  /**
   * opens form on click on button
   */
  openForm() {
    this.DOM.className = "noscroll";
    document.querySelector("main").setAttribute("aria-hidden", "true");
    document.querySelector("header").setAttribute("aria-hidden", "true");
    new Form(this.DOM, this.id);
  }

  /**
   * updates the likes in the photographer info if clicked
   *
   * @param   {Boolean}  increment  true or false
   *
   */
  updateLikes(increment) {
    this.totalLikes += increment ? 1 : -1;
    this.information.update(this.totalLikes);
  }

  /**
   * Sorts the media with the filter selected
   *
   * @param   {String}  filter  activated filter
   */
  sortMedia(filter) {
    this.activeFilter = filter;
    this.udpdateGallery();
  }
}
