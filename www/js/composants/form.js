import Button from "./button.js";

export default class Form {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 *
	 */
	constructor(domTarget, callback) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "modalBackground";

		this.callback = callback;

		this.render();
		this.DOM.onclick = () => callback(this.DOM);
	}

	render() {
		const modal = document.createElement("div");
		modal.className = "formModal";
		this.DOM.appendChild(modal);

		modal.innerHTML = `
			<h2 class="formTitle">Contactez-moi</h2>
			<button class="close"><i class="fas fa-times"></i></button>
			<form>
				<label for="firstName"> Prénom </label>
				<input type="text" id="firstName" name="firstName" />
				<label for="lastName"> Nom </label>
				<input type="text" id="lastName" name="lastName" />
				<label for="email"> Email </label>
				<input type="email" id="email" name="email" />
				<label for="message"> Votre message </label>
				<textarea id="message" name="message"></textarea>
			</form>
	`;
	new Button(modal, "Envoyer", null);
	}
}