import ListItem from "./listItem.js";

export default class Dropdown {
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
		// this.testRender();
	}

	render() {
		this.DOM.innerHTML = `
	  <p class="dropdown-label" id="sortTitle">Trier par</p>
	  `;

		this.dropdown = document.createElement("ul");
		this.dropdown.className = "dropdown absolutePosition";

		if (!this.folded) {
			this.DOM.appendChild(this.dropdown);
			this.dropdown.classList.add("list");
			this.dropdown.setAttribute("aria-expanded", "true");
			this.filters.forEach((filter) => {
				new ListItem(
					this.dropdown,
					filter,
					this.changeFilters.bind(this),
					this.changeFocus.bind(this),
					false
				);
			});
		}

		if (this.folded) {
			new ListItem(
				this.DOM,
				this.activeFilter,
				this.changeFilters.bind(this),
				null,
				true
			);

			return;
		}

		//Accessibility
		this.dropdown.tabIndex = 0;
		this.dropdown.setAttribute("role", "listbox");
		this.dropdown.setAttribute("aria-activedescendant", this.activeFilter);
		this.dropdown.setAttribute("aria-labelledBy", "sortTitle");
		document.querySelectorAll("li").forEach((li) => (li.tabIndex = 0));
	}

	changeFilters(name) {
		this.folded = !this.folded;
		this.activeFilter = name;
		if (this.folded) {
			this.callback(name);
		}

		//reorder filters list
		let newFilters = [];
		this.filters.forEach((filter) => {
			if (filter === name) {
				newFilters.push(filter);
				return;
			}
		});
		this.filters.forEach((filter) => {
			if (filter !== name) {
				newFilters.push(filter);
			}
		});
		this.filters = newFilters;

		//render and accessibility management
		this.render();
		this.dropdown.setAttribute("aria-activedescendant", name);
		this.dropdown.querySelectorAll("li").forEach((li) => {
			if (li.id === name) {
				li.setAttribute("aria-selected", "true");
				li.focus();
			} else {
				li.setAttribute("aria-selected", "false");
			}
		});
	}

	//access by arrowDown or arrowUp
	changeFocus(name, move) {
		let index = this.filters.findIndex((filter) => filter === name);
		this.dropdown.querySelectorAll("li").forEach((li) => {
			if (li.getAttribute("aria-selected") === "true") {
				if (move === "down") {
					let newFocus = this.filters.find((filter) => this.filters.indexOf(filter) === index+1);
					// @ts-ignore
					document.querySelector(`#${newFocus}`).focus();
				}
				if (move === "up") {
					let newFocus = this.filters.find((filter) => this.filters.indexOf(filter) === index-1);
					// @ts-ignore
					document.querySelector(`#${newFocus}`).focus();
				}
			}
		});
	}
}
