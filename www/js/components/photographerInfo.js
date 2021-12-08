export default class PhotographerInfo{
	/**
	 *
	 * @param   {HTMLElement}  domTarget 
	 */
	constructor(domTarget, profileData, totalLikes) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "photographerInfo";
		this.likes = totalLikes;
		this.price = profileData.price;

		this.render();
	}

	render() {
		this.DOM.innerHTML = `
    <p class="likes">${this.likes}</p>
    <p class="price">${this.price}€ / jour</p>
    `;
	}

	update(likes){
		this.likes = likes;
		this.render();
	}
}
