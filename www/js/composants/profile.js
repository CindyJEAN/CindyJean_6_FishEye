import Tag from "../composants/tag.js"
import Button from "./button.js";
export default class Profile {
	// src = null;
	// name = null;

	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget    
	 * @param   {String}  page    page where the profile is implemented: index or photographer-page
	 * @param {import("../dataManager.js").photographerProfile} profileData
	 *
	 */
	constructor(domTarget, profileData, page, formCallback) {
		this.DOM = document.createElement("article");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "profile";

		this.profileData = profileData;
		this.photo = "content/id/" + profileData.portrait.replace(".", "-small.");
		this.name = profileData.name;
		this.city = profileData.city;
		this.country = profileData.country;
		this.tagline = profileData.tagline;
		this.price = profileData.price;
		this.callback = formCallback;
		this.id = profileData.id;
		this.description = profileData.description;

		if (page === "index") {
			this.indexRender();
		}
		else this.photographerRender();

	}

	indexRender() {
		this.DOM.innerHTML = `
    <button onclick="window.changePage('photographer',${this.id})" class="photographer">
		  <img src=${this.photo} alt="${this.description}" class="profile-photo" />
		  <h2>${this.name}</h2>
	  </button>
    <address>${this.city}, ${this.country}</address>
		<p class="tagline">${this.tagline}</p>
		<p class="price">${this.price}€/jour</p>
    `;
		this.profileData.tags.forEach((tag) => {
			new Tag(this.DOM, tag);
		});
	}

	photographerRender() {
		this.DOM.innerHTML = `
		<h1>${this.name}</h1>
    <address>${this.city}, ${this.country}</address>
		<p class="tagline">${this.tagline}</p>
		
		<img src=${this.photo} alt="${this.description}" class="profile-photo" />
    `;
		
		const tags = document.createElement("div");
		this.DOM.appendChild(tags);
		tags.className = "tags";
		this.profileData.tags.forEach((tag) => {
			new Tag(tags, tag);
		})
		
		new Button(this.DOM, "Contactez-moi", this.callback);
	}
}
