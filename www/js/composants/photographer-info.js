class PhotographerInfo{
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 */
	constructor(domTarget) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "photographerInfo";
		this.render();
	}

	render() {
		this.DOM.innerHTML = `
    <p class="likes"><%- likes %></p>
    <p class="price"><%- price %>€ / jour</p>
    `;
	}
}
