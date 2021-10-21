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
		this.DOM.innerHTML = `
		<div class="formModal">
		<h1 class="formTitle">Contactez-moi</h1>
			<form>
				<label for="firstName"> Prénom </label>
				<input type="text" id="firstName" name="firstName" />
				<label for="lastName"> Prénom </label>
				<input type="text" id="lastName" name="lastName" />
				<label for="email"> Prénom </label>
				<input type="email" id="email" name="email" />
			</form>
		</div>
	`;
	}
}
//button à ajouter