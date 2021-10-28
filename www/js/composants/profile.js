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
	constructor(domTarget, profileData, page, callback) {
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
		this.callback = callback;
		this.id = profileData.id;

		if (page === "index") {
			this.indexRender();
		}
		else this.photographerRender();

    // this.render();
	}

	indexRender() {
		this.DOM.innerHTML = `
    <div onclick="window.changePage('photographer',${this.id})">
		  <img src=${this.photo} alt="" class="profile-photo" />
		  <h2>${this.name}</h2>
	  </div>
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
		
		<img src=${this.photo} alt="" class="profile-photo" />
    `;
		new Button(this.DOM, "Contactez-moi", this.callback);

		const tags = document.createElement("div");
		this.DOM.appendChild(tags);
		tags.className = "tags";
		this.profileData.tags.forEach((tag) => {
			new Tag(tags, tag);
		})
	}
}
