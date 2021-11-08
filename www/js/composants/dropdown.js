import ListItem from "./listItem.js";

export default class Dropdown{
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 * @param   {Function}  callback  [domTarget description]
	 * @param   {Array}  filters  [domTarget description]
	 *
	 */
	constructor(domTarget, filters, callback) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "filter";
		this.callback = callback;

		this.filters = filters;
		this.activeFilter = this.filters[0];
		this.folded = true;

		this.render();
	}

	render() {
		this.DOM.innerHTML = `
    <p class="dropdown-label">Trier par</p>
    `;

		const ul = document.createElement("ul");
		ul.className = "dropdown";
		if (!this.folded) ul.classList.add("list");
		this.DOM.appendChild(ul);
		if (this.folded){
			new ListItem(ul, this.activeFilter, this.changeFilters.bind(this));
			return;
		}
		this.filters.forEach(filter => {
			new ListItem(ul, filter, this.changeFilters.bind(this)); 
		});
	}

	changeFilters(name) {
		this.folded = ! this.folded;
		if (this.folded) {
			this.activeFilter = name;
			this.callback(name);
		}
		this.render();
	}
}
