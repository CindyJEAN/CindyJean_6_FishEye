import { getPhotographerById } from "../dataManager.js";
import Button from "./button.js";

export default class Form {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 *
	 */
	constructor(domTarget, photographerId, callback) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "modalBackground";
		this.domTarget = domTarget;
		this.callback = callback;
		this.photographerId = photographerId;

		this.render();
	}

	async render() {
		const profileData = await getPhotographerById(this.photographerId);
		const modal = document.createElement("div");
		modal.className = "formModal";
		this.DOM.appendChild(modal);
		modal.focus;

		modal.innerHTML = `<h2 class="formTitle">Contactez-moi ${profileData.name}</h2>`;

		const closeButton = document.createElement("button");
		closeButton.className = "close";
		closeButton.innerHTML = `<i class="fas fa-times"></i>`;
		modal.appendChild(closeButton);
		closeButton.onclick = () => {
			this.callback(this.DOM);
			this.domTarget.className = "";
		};

		this.form = document.createElement("form");
		this.form.innerHTML = `
			<label for="firstName"> Prénom </label>
			<input type="text" id="firstName" name="firstName" required minlength="2"/>
			<label for="lastName"> Nom </label>
			<input type="text" id="lastName" name="lastName" required minlength="2"/>
			<label for="email"> Email </label>
			<input type="email" id="email" name="email" required />
			<label for="message"> Votre message </label>
			<textarea id="message" name="message" required ></textarea>
		`;
		modal.appendChild(this.form);

		new Button(this.form, "Envoyer", this.validateForm.bind(this));
	}

	/**
	 * Tests the validity of the form input values and displays them in the console
	 *
	 * @param   {Event}  e  [e description]
	 *
	 */
	validateForm(e) {
		e.stopPropagation();
    if (this.form.checkValidity()) {
      e.preventDefault();
    }
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => console.log(input.name + " : ", input.value));
    console.log("message : ", document.querySelector("textarea").value);
  }
	
}
