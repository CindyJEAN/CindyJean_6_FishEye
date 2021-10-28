export default class Media {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 * @param   {Object}  media  [domTarget description]

	 *
	 */
	constructor(domTarget, media, callback = null) {
		this.DOM = document.createElement("article");
		this.DOM.className = "mediaArticle";
		domTarget.appendChild(this.DOM);
		this.title = media.title;
		this.likes = media.likes;
		this.image = media.image;
		this.video = media.video;
		this.videoFrame = "content/media/" + media.video + "#t=0.5";
		this.id = media.id;
		this.photographerId = media.photographerId;
		this.description = media.description;
		this.liked = false;
		this.callback = callback;

		//---click on media
		// this.callback = callback;
		this.medium = media;

		//--- Type of media management
		this.mediaType = media.hasOwnProperty("image") ? "image" : "video";

		//--- Render
		this.render();
		// this.DOM.onclick = () => {
		// 	console.log("image url :", this.image, "video url :", this.video);
		// };
	}

	render() {
		this.DOM.innerHTML = `
		<h3>${this.title}</h3> 
		${this.video ? this.addVideo() : this.addImage()}`;
		
		const buttonLikes = document.createElement("button");
		const likes = parseInt(this.likes) + (this.liked ? 1 : 0);
		buttonLikes.innerHTML = `${likes}<i class="fa${
			this.liked ? "s" : "r"
		} fa-heart"></i>`;
		buttonLikes.onclick = () => this.addLike();
		this.DOM.appendChild(buttonLikes);
	};

	addLike() {
		this.liked = !this.liked;
		this.render();
		this.callback(this.liked);
	};

	addVideo() {
		return `
		<video preload="auto" onclick="window.changePage('lightbox','${this.photographerId}','${this.id}')">
			<source src="./content/media/${this.video}" type="video/mp4">
			</video>
			`;
			// ${this.description}
	};

	addImage() {
		return `
			<img src="./content/media/${this.image.replace(".", "-small.")}" alt="${this.description}" 
			title="${this.title}" onclick="window.changePage('lightbox','${this.photographerId}','${this.id}')">
		`;
	};
};

// ${this.photographerId}/${this.id}
// ${this.id}/${this.photographerId}