import { getPhotographerById } from "../dataManager.js";
import Button from "./button.js";

export default class Form {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 *
	 */
	constructor(domTarget, photographerId) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "modalBackground";
		this.domTarget = domTarget;
		this.photographerId = photographerId;
		// this.DOM.setAttribute("role", "dialog");
		// this.DOM.setAttribute("aria-modal", "true");
		// this.DOM.setAttribute("arial-labelledby", "formTitle");
		// // this.DOM.setAttribute("arial-describedby", "formTitle");
		// this.DOM.setAttribute("aria-hidden", "false");
		// this.DOM.tabIndex = -1;

		this.render();
	}

	async render() {
		const profileData = await getPhotographerById(this.photographerId);
		const modal = document.createElement("section");
		modal.className = "formModal";
		this.DOM.appendChild(modal);


		modal.innerHTML = `<h1 class="formTitle" id="formTitle">Contactez-moi ${profileData.name}</h2>`;

		const closeButton = document.createElement("button");
		closeButton.className = "close";
		closeButton.innerHTML = `<i class="fas fa-times"></i>`;
		closeButton.ariaLabel = "close contact form";
		modal.appendChild(closeButton);

		this.form = document.createElement("form");
		this.form.innerHTML = `
			<label for="firstName">Prénom</label>
			<input type="text" id="firstName" name="firstName" required aria-required=true minlength="2" pattern="[A-Za-z' -]+"
			title="Veuillez entrer un prénom de 2 à 30 caractères, sans chiffre."/>
			<label for="lastName">Nom</label>
			<input type="text" id="lastName" name="lastName" required aria-required=true minlength="2" pattern="[A-Za-z' -]+"
			title="Veuillez entrer un nom de 2 à 30 caractères, sans chiffre."/>
			<label for="email">Email</label>
			<input type="email" id="email" name="email" required aria-required=true pattern="\S+@\S+\.\S+/"
			title="Veuillez entrer une adresse mail valide"/>
			<label for="message">Votre message</label>
			<textarea id="message" name="message" required aria-required=true></textarea>
		`;
		modal.appendChild(this.form);

		new Button(this.form, "Envoyer", this.validateForm.bind(this));

		//Accessibility
		modal.focus();
		modal.setAttribute("role", "dialog");
		modal.setAttribute("aria-modal", "true");
		modal.setAttribute("arial-labelledby", "formTitle");
		// modal.setAttribute("arial-describedby", "formTitle");
		modal.setAttribute("aria-hidden", "false");
		modal.tabIndex = -1;

		//----- Closing the modal -----//
		closeButton.onclick = () => {
			this.DOM.parentElement.className = "";
			this.DOM.parentElement.setAttribute("aria-hidden", "false");
			this.DOM.parentNode.removeChild(this.DOM);
		};
		document.querySelector("body").addEventListener("keydown", e => {
			if (this.DOM.getAttribute("aria-hidden") == "false" && e.key === "Escape") {
			this.DOM.parentElement.className = "";
			this.DOM.parentElement.setAttribute("aria-hidden", "false");
			this.DOM.parentNode.removeChild(this.DOM);
			}
		})
	}


	/**
	 * Tests the validity of the form input values and textarea and displays them in the console. 
	 * Adds aria-invalid attribute true or false.
	 *
	 * @param   {Event}  e  [e description]
	 *
	 */
	validateForm(e) {
		e.stopPropagation();
		const inputs = this.DOM.querySelectorAll("input");
		const textarea = this.DOM.querySelector("textarea");

		if (!this.form.checkValidity()) {
	inputs.forEach((input) => {
		!input.validity.valid ? input.setAttribute("aria-invalid", "true") : input.setAttribute("aria-invalid", "false")
	})
	textarea.validity.valid ? textarea.setAttribute("aria-invalid", "true") : textarea.setAttribute("aria-invalid", "false")}

		if (this.form.checkValidity()) {
			e.preventDefault();
			inputs.forEach((input) => console.log(input.name + " : ", input.value));
			console.log("message : ", textarea.value);
			this.DOM.parentNode.removeChild(this.DOM);
		}
	}
}
