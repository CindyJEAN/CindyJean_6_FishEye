import Profile from "../components/profile.js";
import Header from "../components/header.js";
import { getPhotographersTags, getPhotographersList } from "../dataManager.js";
export default class Index {
	/**
	 *
	 * @param   {HTMLElement}  domTarget
	 * @param   {String}  selectedTag  tag selected by redirection
	 */
	constructor(domTarget, selectedTag) {
		this.activeTags = selectedTag === undefined ? [] : [selectedTag];
		this.DOM = domTarget;
		this.render();
	}

	async render() {
		this.DOM.innerText = "";
		const tags = await getPhotographersTags();

		new Header(this.DOM, tags, this.clickOnTag.bind(this));

		this.main = document.createElement("main");
		this.DOM.appendChild(this.main);
		this.main.id = "indexMain";

		this.showPhotographers();
	}

	//To update gallary of photographers without updating all page
	showPhotographers() {
		this.main.innerHTML = `<h1>Nos photographes</h1>`;
		const mainContent = document.createElement("div");
		mainContent.className = "gallery";
		mainContent.id = "indexMainContent";
		this.main.appendChild(mainContent);
		const profiles = getPhotographersList(this.activeTags);

		profiles.forEach((profilePhotographer) => {
			new Profile(mainContent, profilePhotographer, "index");
		});
	}

	/**
	 * on click on tag, adds the tag to the list of selected tags,
   * or removes it if it was already selected
	 *
	 * @param   {String}  tagName  tag selected
	 *
	 */
	clickOnTag(tagName) {
		const position = this.activeTags.indexOf(tagName);
		if (position === -1) this.activeTags.push(tagName);
		else this.activeTags.splice(position, 1);
		this.showPhotographers();
	}
}
