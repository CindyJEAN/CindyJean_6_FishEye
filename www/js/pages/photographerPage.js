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
		this.totalLikes = 0;
		this.render();
	}

	async render() {
		const profileData = await getPhotographerById(this.id);
		let media = await this.sortMedia();

		new Header(this.DOM, null, null);

		const main = document.createElement("main");
		this.DOM.appendChild(main);
		main.className = "photographerMain";

		new Profile(main, profileData, "photographer", this.openForm.bind(this));
		// new Profile(main, profileData, "photographer", this.openForm.bind(this), this.clickOnTag.bind(this));
		new Dropdown(main, this.sortMedia.bind(this));

		const gallery = document.createElement("div");
		main.appendChild(gallery);
		gallery.className = "gallery";

		media.forEach((medium) => {
			new Media(gallery, medium, this.updateLikes.bind(this));
			this.totalLikes += medium.likes;
		});

		this.information = new PhotographerInfo(main, profileData, this.totalLikes);
	}

	openForm() {
		new Form(this.DOM, this.closeForm.bind(this));
	}

	closeForm(modal) {
		this.DOM.removeChild(modal);
	}

	updateLikes(increment) {
		this.totalLikes += increment ? 1 : -1;
		this.information.update(this.totalLikes);
	}

	async sortMedia(filter) {
		const media = await getMediaByPhotographerId(this.id);
		if (filter === undefined) {
			filter = "Popularité";
		};
		console.log("filter", filter);
		let sortedMedia = [...media];
		switch (filter) {
			case "Popularité":
				sortedMedia.sort((a, b) => b.likes - a.likes);
				break;
			case "Date":
				sortedMedia.sort((a, b) => {
					let dateB = new Date(b.date);
					let dateA = new Date(a.date);
					return dateB < dateA ? -1 : 1;
				});
				break;
			case "Titre":
				sortedMedia.sort((a, b) => (b.title < a.title ? 1 : -1));
				break;
			default:
				sortedMedia;
				break;
		}
		sortedMedia.map((medium) => console.log("mediumFilter", medium[filter]));

		console.log("media", media);
		console.log("sortedMedia", sortedMedia);
		console.log(window.console);
		return sortedMedia;
	}

	// clickOnTag(tagName) {
	// 	window.changePage('index');
	// }
}
