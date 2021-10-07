export default class PhotographerInfo{
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 */
	constructor(domTarget, profileData) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "photographerInfo";
		this.likes = profileData.likes;
		this.price = profileData.price;

		this.render();
	}

	render() {
		this.DOM.innerHTML = `
    <p class="likes">${this.likes}</p>
    <p class="price">${this.price}€ / jour</p>
    `;
	}
}
