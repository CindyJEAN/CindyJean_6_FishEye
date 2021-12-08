import Form from "./form.js";

export default class Button {
	/**
	 * @param   {HTMLElement}  domTarget
	 * @param   {String}  text            text inside the button : Contactez-moi or Envoyer
	 * @param   {Function}  callback      validateForm or openForm depending on the button
	 */
	constructor(domTarget, text, callback) {
		this.DOM = document.createElement("button");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "contact";
		this.DOM.innerText = text;

		if (text === "Envoyer") {
			this.DOM.ariaLabel = "envoyer";
			this.DOM.onclick = (e) => callback(e);
			this.DOM.onkeydown = (e) => {
				if (e.key === "Space") {
					callback(e);
				}
			};
			return;
		}
		
		//Open form on click on "Contactez-moi" button
		if (text === "Contactez-moi") {
			this.DOM.ariaLabel = "contactez-moi";
			this.DOM.onclick = () => callback("formModal");
			this.DOM.onkeydown = (e) => {
				if (e.key === "Space") {
					callback("formModal");
				}
			};
		}
	}
}
