export default class Media {
  /**
   *
   * @param   {HTMLElement}  domTarget
   * @param   {Object}  media  media data
   * @param   {Function}  callback updateLike function
   *
   */
  constructor(domTarget, media, callback) {
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
    this.medium = media;

    this.mediaType = Object.prototype.hasOwnProperty.call(media, "image") ? "image" : "video";

    this.render();
  }

  render() {
    this.DOM.innerHTML = `
		<h3>${this.title}</h3> 
		<a href="index.html#lightbox/${this.photographerId}/${this.id}">
		${this.video ? this.addVideo() : this.addImage()}
		</a>`;

    this.likeButton = document.createElement("button");
    const likes = parseInt(this.likes) + (this.liked ? 1 : 0);
    this.likeButton.innerHTML = `${likes}<i class="fa${
      this.liked ? "s" : "r"
    } fa-heart"></i>`;
    this.likeButton.className = "like";
    this.likeButton.ariaLabel = `${likes} likes`;
    this.DOM.appendChild(this.likeButton);
    this.likeButton.onclick = () => this.addLike();
  }

  /**
   * adds or removes like on click on button,
   * then calls updateLike function
   *
   */
  addLike() {
    this.liked = !this.liked;
    this.render();
    this.callback(this.liked);
    this.likeButton.focus();
  }

  addVideo() {
    return /*HTML*/ `
			<video preload="auto" onclick="window.changePage('lightbox','${this.photographerId}','${this.id}')"
			aria-label="${this.description}, vers vidéo agrandie">
			<source src="./content/media/${this.video}" type="video/mp4">
			</video>
			`;
  }

  addImage() {
    return /*HTML*/ `
			<img src="./content/media/${this.image.replace(".", "-small.")}" alt="${this.description}, vers image agrandie" 
			title="${this.title}" onclick="window.changePage('lightbox','${this.photographerId}','${this.id}')">
		`;
  }
}
