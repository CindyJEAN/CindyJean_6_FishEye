export default class ListItem {
	/**
	 *
	 * @param   {HTMLElement}  domTarget  
	 * @param   {String}  name    name of filter
	 * @param   {Function}  callback   changeFilters function
	 * @param   {Function}  focusCallback   changeFocus function
	 *
	 */
	constructor(
		domTarget,
		name,
		callback = null,
		focusCallback = null,
		button = false
	) {
		this.DOM = document.createElement("li");
		domTarget.appendChild(this.DOM);
		this.DOM.innerText = name;
		this.DOM.id = name;
		this.DOM.ariaLabel = name;
		this.callback = callback;
		this.focusCallback = focusCallback;
		this.DOM.className = "listItem";

		this.DOM.onclick = () => {
			this.callback(name);
		};

		this.handleKeyEvents(name);

		if (button === true) {
			this.DOM.className = "dropdown-btn absolutePosition";
			this.DOM.setAttribute("role", "button");
			this.DOM.setAttribute("aria-haspopup", "listbox");
			this.DOM.setAttribute("aria-expanded", "false");
			this.DOM.tabIndex = 0;
		} else this.DOM.setAttribute("role", "option");
	}

	/**
	 * onkeydown on a listItem, calls a callback to perform an action based on the key :
	 * enter : selects the filter to activate / 
	 * arrowDown : moves focus down the list of filters / 
	 * arrowUp : moves focus up the list of filters / 
	 * escape : folds the dropdown
	 *
	 * @param   {String}  name  name of filter
	 */
	handleKeyEvents(name) {
		this.DOM.onkeydown = (e) => {
			if (
				e.key === "Enter" ||
				e.key === "ArrowDown" ||
				e.key === "ArrowUp" ||
				e.key === "Escape"
			) {
				e.preventDefault();
				e.stopPropagation();
			}
			if (e.key === "Enter") {
				this.callback(name);
			}
			if (e.key === "ArrowDown") {
				this.focusCallback(name, "down");
			}
			if (e.key === "ArrowUp") {
				this.focusCallback(name, "up");
			}
			if (e.key === "Escape") {
				this.callback();
			}
		};
	}
}
