import { getMediaByPhotographerId } from "../dataManager.js";
export default class Lightbox {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 * @param  {Object}  props
	 * @param   {String} props.photographerId
	 * @param   {String} props.mediaId
	 *
	 */
	constructor(domTarget, props) {
		this.DOM = domTarget;
		this.lightbox = document.createElement("div");
		this.DOM.appendChild(this.lightbox);
		this.lightbox.className = "lightbox";
		
		this.photographerId = parseInt(props.photographerId);
		this.id = parseInt(props.mediaId);
		// this.photographerId = photographerId;

		// this.image = "content/media/" + media.image;
		// this.title = media.title;
		// this.video = media.video;

		this.render();
	}

	async render() {
		this.media = await getMediaByPhotographerId(this.photographerId);
		this.index = this.media.findIndex((element) => element.id === this.id);
		this.actualMedia = this.media[this.index];
		// this.description = this.actualMedia.description || "";
		this.image = this.actualMedia.image;
		this.video = this.actualMedia.video;
		this.title = this.actualMedia.title;

		this.lightbox.innerHTML = `
				${this.video ? this.addVideo() : this.addImage()}
        <button class="close"><i class="fas fa-times"></i></button>
    `;

		const leftButton = document.createElement("button");
		leftButton.className = "left";
		leftButton.innerHTML = `<i class="fas fa-chevron-left"></i>`;
		this.lightbox.appendChild(leftButton);
		leftButton.onclick = () => this.changeIndex("previous");
		const rightButton = document.createElement("button");
		rightButton.className = "right";
		rightButton.innerHTML = `<i class="fas fa-chevron-right"></i>`;
		this.lightbox.appendChild(rightButton);
		rightButton.onclick = () => this.changeIndex("next");


		console.log("mediaId", this.id, typeof this.id);
		console.log("index", this.index);
		console.log("actualMedia", this.actualMedia);
	}

	addVideo() {
		return `
		<video preload="auto" controls>
			<source src="./content/media/${this.video}" type="video/mp4">
		</video>
		`;
	};

	addImage() {
		return `
			<img src="./content/media/${this.image.replace(".", "-small.")}" 
			title="${this.title}">
		`;
	};

	changeIndex(move) {
		if (move === "previous") {
			if ( this.index === 0) {
				this.index = this.media.length -1;
			}
			else { this.index-- };
		}
		else {
			if ( this.index === this.media.length -1) {
				this.index = 0;
			}
			else { this.index++ };
		}
		this.render();
	};
}
