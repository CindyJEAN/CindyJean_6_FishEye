import ListItem from "./listItem.js";

const filters = ["Popularité", "Date", "Titre"];
export default class Dropdown{
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

		this.filters = new Set(["Popularité"]);
		this.filter = this.filters[0];
		
		this.render();
	}

	render() {
		this.DOM.innerHTML = `
    <p class="dropdown-label">Trier par</p>
    `;
    // <ul class="dropdown">
    //   <li>Popularité</li>
    //   <li>Date</li>
    //   <li>Titre</li>
    // </ul>

		const ul = document.createElement("ul");
		ul.className = "dropdown";
		this.DOM.appendChild(ul);

		this.filters.forEach(filter => {
			new ListItem(ul, filter, this.changeFilters.bind(this)); 
		});
	
		// this.selectedListItem = document.createElement("li");
		// this.selectedListItem.innerHTML = this.filter;
		// ul.appendChild(this.selectedListItem);

		// this.selectedListItem.onclick = () => ;
	}

	changeFilters(name) {
		if (this.filters.size === 1) {
			filters.forEach(filter => {
				this.filters.add(filter);
			})
		}
		else {
			this.filters.clear;
			this.filters.add(name);
		}
		this.render();
	}
}
