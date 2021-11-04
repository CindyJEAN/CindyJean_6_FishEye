import ListItem from "./listItem.js";

const filters = ["Popularité", "Date", "Titre"];
export default class Dropdown{
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 *
	 */
	constructor(domTarget, callback) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "filter";
		this.callback = callback;

		this.filters = new Set(["Popularité"]);
		this.sorting = this.filters[0];
		
		this.render();
	}

	render() {
		this.DOM.innerHTML = `
    <p class="dropdown-label">Trier par</p>
    `;

		const ul = document.createElement("ul");
		ul.className = "dropdown";
		this.DOM.appendChild(ul);

		this.filters.forEach(filter => {
			new ListItem(ul, filter, this.changeFilters.bind(this)); 
		});
		// console.log(this.filters);
		// console.log(window.console);
	}

	changeFilters(name) {
		if (this.filters.size === 1) {
			filters.forEach(filter => {
				this.filters.add(filter);
			});
		}
		else {
			this.filters.clear();
			this.filters.add(name);
			this.callback(name);
		}
		this.render();
	}
}
