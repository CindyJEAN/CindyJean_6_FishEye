import Nav from "../composants/nav.js"
import Button from "./button.js";
export default class Header {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 *
	 */
	constructor(domTarget, tags=null, callback=null) {
		this.DOM = document.createElement("header");
		domTarget.appendChild(this.DOM);
		this.tagList = tags;
		this.callback = callback;
		this.render();
	}

	render() {
		this.DOM.innerHTML = `
    <a href="index.html"><img src="content/logo.svg" alt="Fisheye Home page"/></a>
    `;
		if (this.tagList !== null) new Nav(this.DOM, this.tagList, this.callback);

    new Button(this.DOM, "Passer au contenu", null);

	}

}
