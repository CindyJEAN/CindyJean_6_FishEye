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
	}

	render() {
		this.DOM.innerHTML = `
    <p class="dropdown-label" id="sortTitle">Trier par</p>
    `;

		this.ul = document.createElement("ul");
		this.ul.className = "dropdown absolutePosition";

		if (!this.folded) {
			this.DOM.appendChild(this.ul);
			this.ul.classList.add("list");
			this.ul.setAttribute("aria-expanded", "true");
			this.filters.forEach((filter) => {
				new ListItem(
					this.ul,
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
		this.ul.tabIndex = 0;
		this.ul.setAttribute("role", "listbox");
		this.ul.setAttribute("aria-activedescendant", this.activeFilter);
		this.ul.setAttribute("aria-labelledBy", "sortTitle");
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
		this.ul.setAttribute("aria-activedescendant", name);
		document.querySelectorAll("li").forEach((li) => {
			if (li.id === name) {
				li.setAttribute("aria-selected", "true");
				li.focus();
			} else {
				li.setAttribute("aria-selected", "false");
			}
		});
	}

	//access by arroDown or arrowUp
	changeFocus(name, move) {
		let index = this.filters.findIndex((filter) => filter === name);
		document.querySelectorAll("li").forEach((li) => {
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
