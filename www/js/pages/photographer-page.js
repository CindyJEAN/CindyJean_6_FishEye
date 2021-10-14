import Header from "../composants/header.js";
import Profile from "../composants/profile.js";
import Dropdown from "../composants/dropdown.js";
import PhotographerInfo from "../composants/photographer-info.js";
// import Modal from "../composants/modal.js";
import Media from "../composants/media.js";
import { getPhotographerById, getMediaByPhotographerId} from "../dataManager.js";
import Modal from "../composants/modal.js";
import Form from "../composants/form.js";
export default class PhotographerPage {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget    [domTarget description]
	 */
	constructor(domTarget, id) {
		this.DOM = domTarget;
		this.id = id;
		this.totalLikes = 0;
		console.log(id, typeof id )
		this.render();
	}

	async render() {
		const profileData = await getPhotographerById(this.id);
		const media = await getMediaByPhotographerId(this.id);

		const main = document.createElement("main");
		this.DOM.appendChild(main);
		main.className = "photographer-main";

		new Header(this.DOM, null, null);
		new Profile(main, profileData, "photographer", this.openModal.bind(this));
		new Dropdown(main);
		// new Modal(main, "lightboxModal");
		// new Form(main);
		
		const gallery = document.createElement("div");
		main.appendChild(gallery);
		gallery.className = "gallery";
		
		media.forEach((medium) => {
			new Media(gallery, medium, this.openModal.bind(this));
			this.totalLikes+= medium.likes;
		});
		new PhotographerInfo(main, profileData, this.totalLikes);
	}

	openModal(className, medium) {
		new Modal(this.DOM, className, medium, this.closeModal.bind(this));
	}

	closeModal(modal) {
		this.DOM.removeChild(modal);
	}

}
