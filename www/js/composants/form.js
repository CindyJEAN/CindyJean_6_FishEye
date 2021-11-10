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
	}

	render() {
		const modal = document.createElement("div");
		modal.className = "formModal";
		this.DOM.appendChild(modal);

		modal.innerHTML = `<h2 class="formTitle">Contactez-moi</h2>`;

		const closeButton = document.createElement("button");
		closeButton.className = "close";
		closeButton.innerHTML = `<i class="fas fa-times"></i>`;
		modal.appendChild(closeButton);
		closeButton.onclick = () => this.callback(this.DOM);

		const form = document.createElement("form");
		form.innerHTML = `
			<label for="firstName"> Prénom </label>
			<input type="text" id="firstName" name="firstName" />
			<label for="lastName"> Nom </label>
			<input type="text" id="lastName" name="lastName" />
			<label for="email"> Email </label>
			<input type="email" id="email" name="email" />
			<label for="message"> Votre message </label>
			<textarea id="message" name="message"></textarea>
		`;
		modal.appendChild(form);

		new Button(modal, "Envoyer", null);
	}
}
