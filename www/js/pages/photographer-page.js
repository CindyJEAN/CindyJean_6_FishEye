import Header from "../composants/header.js";
import Profile from "../composants/profile.js";
import Dropdown from "../composants/dropdown.js";
import PhotographerInfo from "../composants/photographer-info.js";
// import Modal from "../composants/modal.js";
import Media from "../composants/media.js";
import { getPhotographerById, getMediaByPhotographerId} from "../dataManager.js";
import Modal from "../composants/modal.js";
export default class PhotographerPage {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget    [domTarget description]
	 */
	constructor(domTarget) {
		this.DOM = domTarget;
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
		// new Modal(main, "lightboxModal");

		media.forEach((medium) => new Media(gallery, medium, this.openModal.bind(this)));
	}

	openModal(className, medium) {
		new Modal(this.DOM, className, medium);
	}

	// closeModal(medium) {
	// 	this.DOM.removeChild(medium);
	// }

}
