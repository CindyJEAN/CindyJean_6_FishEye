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
		// this.DOM = document.createElement("button");
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
			// alert();
		}

		this.handleKeyEvents(name);

		if (button === true) {
			this.DOM.className = "dropdown-btn absolutePosition";
			this.DOM.setAttribute("role", "button");
			this.DOM.setAttribute("aria-haspopup", "listbox");
			this.DOM.setAttribute("aria-expanded", "false");
			this.DOM.tabIndex = 0;
		}
	}

	handleKeyEvents(name) {
		// this.keysPressed = {};
		this.DOM.onkeydown = (e) => {
		// 	this.keysPressed[e.key] = true;

		// 	if (this.keysPressed["insert"]) {
				if (e.key === "Enter" || e.key ==="ArrowDown" || e.key === "ArrowUp") {
					e.preventDefault();
					e.stopPropagation();
				}
				if (e.key === "Enter") {
					// if (e.key === "Space" || e.key === "Enter") {
					this.callback(name);
				}
				if (e.key === "ArrowDown") {
					this.focusCallback(name, "down");
				}
				if (e.key === "ArrowUp") {
					this.focusCallback(name, "up");
				}
			}

		// }
		// this.DOM.onkeyup = (e) => {
		// 	delete this.keysPressed[e.key];
		// }
	}
}
