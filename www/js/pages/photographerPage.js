import Header from "../composants/header.js";
import Profile from "../composants/profile.js";
import Dropdown from "../composants/dropdown.js";
import PhotographerInfo from "../composants/photographerInfo.js";
import Media from "../composants/media.js";
import {
	getPhotographerById,
	getMediaByPhotographerId,
} from "../dataManager.js";
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
		// main.className = "photographerMain";
		new Profile(main, profileData, "photographer", this.openForm.bind(this));
		new Dropdown(main, this.filters, this.sortMedia.bind(this));

		this.gallery = document.createElement("div");
		main.appendChild(this.gallery);
		this.gallery.className = "gallery";
		this.udpdateGallery();
		this.information = new PhotographerInfo(main, profileData, this.totalLikes);

	}

	async udpdateGallery() {
		this.gallery.innerText = "";
		const media = getMediaByPhotographerId(this.id, this.activeFilter);

		media.forEach((medium) => {
			new Media(this.gallery, medium, this.updateLikes.bind(this));
			this.totalLikes += medium.likes;
		});
	}

	openForm() {
		this.DOM.className = "noscroll";
		// this.DOM.setAttribute("aria-hidden", "true");
		document.querySelector("main").setAttribute("aria-hidden", "true");
		document.querySelector("header").setAttribute("aria-hidden", "true");
		new Form(this.DOM, this.id);
	}

	updateLikes(increment) {
		this.totalLikes += increment ? 1 : -1;
		this.information.update(this.totalLikes);
	}

	sortMedia(filter) {
		this.activeFilter = filter;
		this.udpdateGallery();
	}
}
