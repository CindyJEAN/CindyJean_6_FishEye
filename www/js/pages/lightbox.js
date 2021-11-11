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
		const main = document.createElement("main");
		this.DOM.appendChild(main);
		main.className = "lightboxMain";
		this.lightbox = document.createElement("div");
		main.appendChild(this.lightbox);
		this.lightbox.className = "lightboxContent";
		
		this.photographerId = parseInt(props.photographerId);
		this.id = parseInt(props.mediaId);

		this.render();
	}

	async render() {
		this.media = await getMediaByPhotographerId(this.photographerId, null);
		this.index = this.media.findIndex((element) => element.id === this.id);
		this.actualMedia = this.media[this.index];
		this.description = this.actualMedia.description || "";
		this.image = this.actualMedia.image;
		this.video = this.actualMedia.video;
		this.title = this.actualMedia.title;

		this.lightbox.innerHTML = `
				${this.video ? this.addVideo() : this.addImage()}
				<h3>${this.title}</h3>
        <button class="close" onclick="window.changePage('photographer','${this.photographerId}')"><i class="fas fa-times"></i></button>
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

		// console.log("mediaId", this.id, typeof this.id);
		// console.log("index", this.index);
		// console.log("actualMedia", this.actualMedia);
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
			<img src="./content/media/${this.image}" alt="${this.description}">
		`;
	};

	/**
	 * increases or decreases the index depending on the button clicked (previous or next), 
	 * then updates the id of the media corresponding to the index in the list, to render the new media selected
	 *
	 * @param   {String}  move  previous or next
	 *     
	 */
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
		this.id = this.media[this.index].id;
		history.pushState({}, this.title, `#lightbox/${this.photographerId}/${this.id}` )
		this.render();
	};
}
