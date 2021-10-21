// import { getMediaByPhotographerId } from "../dataManager";

export default class Lightbox {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 *
	 */
	constructor(domTarget, mediaId) {
		// this.DOM = document.createElement("div");
		// domTarget.appendChild(this.DOM);

		this.DOM = domTarget;
		this.id = mediaId;
		// this.photographerId = photographerId;

		// this.image = "content/media/" + media.image;
		// this.title = media.title;
		// this.video = media.video;

		this.render();
	}

  render() {
	// async render() {
	// 	const media = await getMediaByPhotographerId(this.photographerId);
  //   console.log(media);
		// let actualMedium = null;
    // media.forEach((medium) => {
		// 	if ((this.id = medium.id)) {
    //     actualMedium = medium;
		// 		return;
		// 	}
		// });

    // <img src=${actualMedium.image} alt="" />
    // <h3>${actualMedium.title}</h3>
    // <img src=${this.image} alt="" />
    // <h3>${this.title}</h3>
		this.DOM.innerHTML = `
    <div class="lightbox">
        <button class="left"><i class="fas fa-chevron-left"></i></button>
        <button class="right"><i class="fas fa-chevron-right"></i></button>
        <button class="close"><i class="fas fa-times"></i></button>
      </div>
      `;
	}
}
