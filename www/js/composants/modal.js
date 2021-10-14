import Lightbox from "./lightbox.js";

export default class Modal {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 * @param   {String}  className  modal's className : lightboxModal or formModal
	 *
	 */
	constructor(domTarget, className, media) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.className = className;
		this.DOM.className = "modalBackground";
		this.media = media;
		// this.DOM.className = "modal-bg " + className;

		this.render();
	}

	render() {
		const modal = document.createElement("div");
		this.DOM.appendChild(modal);
		modal.className = this.className;


		new Lightbox(modal, this.media);
	}
}
