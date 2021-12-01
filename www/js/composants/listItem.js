export default class ListItem {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 * @param   {String}  name    name of filter
	 * @param   {Function}  callback   sortMedia function
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

		this.DOM.onclick = () => callback(name);

		this.DOM.onkeydown = (e) => {
			if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				e.stopPropagation();
			}
			if (e.key === "Enter") {
				// if (e.key === "Space" || e.key === "Enter") {
				callback(name);
			}
			if (e.key === "ArrowDown") {
				focusCallback(name, "down");
			}
			if (e.key === "ArrowUp") {
				focusCallback(name, "up");
			}
		};

		if (button === true) {
			this.DOM.className = "dropdown-btn absolutePosition";
			this.DOM.setAttribute("role", "button");
			this.DOM.setAttribute("aria-haspopup", "listbox");
			this.DOM.setAttribute("aria-expanded", "false");
			this.DOM.tabIndex = 0;
		}
	}
}
