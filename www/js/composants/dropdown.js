class Dropdown{
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 *
	 */
	constructor(domTarget) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "filter";
		this.render();
	}

	render() {
		this.DOM.innerHTML = `
    <p class="dropdown-label">Trier par</p>
    <ul class="dropdown">
      <li>Popularité</li>
      <li>Date</li>
      <li>Titre</li>
    </ul>
    `;
	}
}
