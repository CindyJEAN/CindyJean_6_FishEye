import Tag from "../components/tag.js";
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

		if (page === "index") {
			this.indexRender();
		} else this.photographerRender();
	}

	indexRender() {
		const profile = document.createElement("div");
		profile.setAttribute("role", "link");
		profile.className = "photographer";
		profile.ariaLabel = `${this.name}`;
		profile.innerHTML = /*HTML*/ `
			<img src=${this.photo} alt="" class="profile-photo" />
		  <h2>${this.name}</h2>
		`;

		//Accessibility
		profile.tabIndex = 0;
		profile.onclick = () => window.changePage("photographer", this.id);
		profile.onkeydown = (e) => {
			if (e.key === "Enter") {
				window.changePage("photographer", this.id);
			}
		};
		//

		const address = document.createElement("address");
		(address.innerHTML = this.city), this.country;
		const tagline = document.createElement("p");
		tagline.className = "tagline";
		tagline.innerHTML = this.tagline;
		const priceInfo = document.createElement("p");
		priceInfo.className = "price";
		priceInfo.innerHTML = `${this.price}€/jour`;

		this.DOM.appendChild(profile);
		this.DOM.appendChild(address);
		this.DOM.appendChild(tagline);
		this.DOM.appendChild(priceInfo);

		this.profileData.tags.forEach((tag) => {
			new Tag(this.DOM, tag);
		});
	}

	photographerRender() {
		this.DOM.innerHTML = `
		<h1>${this.name}</h1>
    <address>${this.city}, ${this.country}</address>
		<p class="tagline">${this.tagline}</p>
		
		<img src=${this.photo} alt="${this.name}" class="profile-photo" />
    `;

		const tags = document.createElement("div");
		this.DOM.appendChild(tags);
		tags.className = "tags";
		this.profileData.tags.forEach((tag) => {
			new Tag(tags, tag);
		});

		new Button(this.DOM, "Contactez-moi", this.callback);
	}
}
