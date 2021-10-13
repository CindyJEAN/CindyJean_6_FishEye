import Header from "../composants/header.js";
import Button from "../composants/button.js";
import Profile from "../composants/profile.js";
import Dropdown from "../composants/dropdown.js";
import PhotographerInfo from "../composants/photographer-info.js";
import Modal from "../composants/modal.js";
import WorkPhoto from "../composants/media.js";
import { getPhotographerById, getMediaByPhotographerId} from "../dataManager.js";
export default class PhotographerPage {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget    [domTarget description]
	 */
	constructor(domTarget) {
		this.DOM = domTarget;
		// this.data = dataManager;
		this.id = 82;
		this.render();
	}

	async render() {
		const profileData = await getPhotographerById(this.id);
		const media = await getMediaByPhotographerId(this.id);

		const main = document.createElement("main");
		this.DOM.appendChild(main);
		main.className = "photographer-main";

		const gallery = document.createElement("div");
		this.DOM.appendChild(gallery);
		gallery.className = "gallery";

		new Header(this.DOM, null, null);
		new Profile(main, profileData, "photographer");
		new Dropdown(main);
		new PhotographerInfo(main, profileData);
		new Modal(main, "lightboxModal");

		media.forEach((medium) => new WorkPhoto(gallery, medium));
	}
}
