import { getPhotographerById } from "../dataManager.js";
import Button from "./button.js";

export default class Form {
	/**
	 * @param   {HTMLElement}  domTarget
	 *
	 */
	constructor(domTarget, photographerId) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.DOM.className = "modalBackground";
		this.domTarget = domTarget;
		this.photographerId = photographerId;

		this.render();
	}

	async render() {
		const profileData = await getPhotographerById(this.photographerId);
		const modal = document.createElement("section");
		modal.className = "formModal";
		this.DOM.appendChild(modal);

		modal.innerHTML = `<h1 class="formTitle" id="formTitle">Contactez-moi ${profileData.name}</h2>`;

		const closeButton = document.createElement("button");
		closeButton.className = "closeForm";
		closeButton.innerHTML = `<i class="fas fa-times"></i>`;
		closeButton.ariaLabel = "fermer formulaire de contact";
		modal.appendChild(closeButton);

		this.form = document.createElement("form");
		this.form.innerHTML = /*html*/ `	
			<label for="firstName">Prénom</label>
			<input type="text" id="firstName" name="firstName" required aria-required=true pattern="[A-Za-z' -]{2,30}"
			title="Veuillez entrer un prénom de 2 à 30 caractères, sans chiffre."/>
			<label for="lastName">Nom</label>
			<input type="text" id="lastName" name="lastName" required aria-required=true pattern="[A-Za-z' -]{2,30}"
			title="Veuillez entrer un nom de 2 à 30 caractères, sans chiffre."/>
			<label for="email">Email</label>
			<input type="email" id="email" name="email" required aria-required=true
			title="Veuillez entrer une adresse mail valide"/>
			<label for="message">Votre message</label>
			<textarea id="message" name="message" required aria-required=true></textarea>
		`;
		modal.appendChild(this.form);

		new Button(this.form, "Envoyer", this.validateForm.bind(this));

		//Accessibility
		closeButton.focus();
		modal.setAttribute("role", "dialog");
		modal.setAttribute("aria-modal", "true");
		modal.setAttribute("arial-labelledby", "formTitle");
		modal.setAttribute("aria-hidden", "false");
		modal.tabIndex = -1;

		//----- Closing the modal -----//
		closeButton.onclick = () => this.closeForm();
		document.querySelector("body").addEventListener("keydown", (e) => {
			if (modal.getAttribute("aria-hidden") == "false" && e.key === "Escape") {
				this.closeForm();
			}
		});
	}

	/**
	 * Tests the validity of the form input values and textarea and displays them in the console.
	 * Adds aria-invalid attribute true or false.
	 *
	 * @param   {Event}  e
	 *
	 */
	validateForm(e) {
		e.stopPropagation();
		const inputs = this.DOM.querySelectorAll("input");
		const textarea = this.DOM.querySelector("textarea");

		if (!this.form.checkValidity()) {
			inputs.forEach((input) => {
				!input.validity.valid
					? input.setAttribute("aria-invalid", "true")
					: input.setAttribute("aria-invalid", "false");
			});
			textarea.validity.valid
				? textarea.setAttribute("aria-invalid", "true")
				: textarea.setAttribute("aria-invalid", "false");
		}

		if (this.form.checkValidity()) {
			e.preventDefault();
			inputs.forEach((input) => console.log(input.name + " : ", input.value));
			console.log("message : ", textarea.value);
			this.closeForm();
		}
	}

	/**
	 * Changes back the attributes of the page modified with the opening of the modal 
	 * and remove the modal
	 *
	 */
	closeForm() {
		this.DOM.parentElement.removeAttribute("class");
		this.DOM.parentElement.querySelector("main").setAttribute("aria-hidden", "false");
		this.DOM.parentElement.querySelector("header").setAttribute("aria-hidden", "false");
		this.DOM.parentNode.removeChild(this.DOM);
	}
}
