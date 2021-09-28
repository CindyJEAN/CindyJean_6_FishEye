class Profile {
	// src = null;
	// name = null;

	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget    
	 * @param   {Object}  profileData  photographer Object
	 * @param   {String}  profileData.portrait  url of the profile photo
	 * @param   {String}  profileData.name  name of the photographer
	 * @param   {String}  profileData.city  address city
	 * @param   {String}  profileData.country  address country
	 * @param   {String}  profileData.tagline  tagline of the photographer
	 * @param   {Array}  profileData.tags  tags of the photographer
	 * @param   {Array}  profileData.price  price
	 *
	 */
	constructor(domTarget, profileData) {
		this.DOM = document.createElement("article");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "profile";

		this.profileData = profileData;
		this.photo = "photos/id/" + profileData.portrait;
		this.name = profileData.name;
		this.city = profileData.city;
		this.country = profileData.country;
		this.tagline = profileData.tagline;
		this.price = profileData.price;
		// this.tags = profileData.tags;

		// const container = document.createElement("div");
		// const profilePhoto = document.createElement("img");
		// profilePhoto.className = "profile-photo";
		// profilePhoto.src = this.photo;
		// this.DOM.appendChild(container);
		// container.appendChild(profilePhoto);

    this.render();
	}

	render() {
		this.DOM.innerHTML = `
    <div onclick="window.location.href='photographer-page.html'">
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
}
