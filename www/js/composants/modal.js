export default class Modal {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 * @param   {String}  className  modal's className : lightboxModal or formModal
	 *
	 */
	constructor(domTarget, className) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.className = className;
		this.DOM.className = "modal " + className;
		this.render();
	}

	render() {
		if (this.className === "lightboxModal") {
			this.DOM.innerHTML = `
      <div class="lightbox">
        <img src="photos/media/Animals_Rainbow.jpg" alt="" />
        <h3>Rainbow Bird</h3>
        <button class="left"><i class="fas fa-chevron-left"></i></button>
        <button class="right"><i class="fas fa-chevron-right"></i></button>
        <button class="close"><i class="fas fa-times"></i></button>
      </div>
      `;
		}
	}
}
