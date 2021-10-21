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
		this.image = "content/media/" + media.image;
		this.video = "content/media/" + media.video;
		this.videoFrame = "content/media/" + media.video + "#t=0.5";
		this.id = media.id;
		this.photographerId = media.photographerId;

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
				 <button onclick="() => this.addLike()">${this.likes}<i class="fas fa-heart"></i></button>
      `;

		//Photo or video display
		let media = null;
		if (this.mediaType === "image") {
			media = document.createElement("img");
			media.src = this.image;
			media.alt = "";
		} else {
			media = document.createElement("video");
			let source = document.createElement("source");
			media.appendChild(source);
			source.src = this.video;
			// source.type = "video/mp4";
			media.controls = true;
			// media.poster = this.videoFrame;
			media.preload = "auto";
		}
		this.DOM.appendChild(media);

		media.onclick = () => window.changePage('media', this.id);
	}

	addLike() {
		let numberOfLikes = this.likes;
		numberOfLikes++;
		console.log(this.likes);
		this.render();
	}
}
