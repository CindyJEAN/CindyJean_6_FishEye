export default class Media {
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   * @param   {Object}  media  [domTarget description]
   * @param   {String}  media.title  [domTarget description]
   * @param   {String}  media.image  [domTarget description]
   * @param   {String}  media.likes  [domTarget description]
   * @param   {String}  media.video  [domTarget description]
   *
   */
	constructor(domTarget, media) {
		this.DOM = document.createElement("article");
		this.DOM.className = "mediaArticle";
		domTarget.appendChild(this.DOM);
      this.title = media.title;
      this.likes = media.likes;
      this.image = "content/media/"+ media.image;
      this.video = "content/media/" + media.video;
      this.videoFrame = "content/media/" + media.video + "#t=0.5";

      //--- Type of media management
      this.mediaType = media.hasOwnProperty("image") ? "image" : "video";

      //--- Render
		this.render();
      this.DOM.onclick = () => { console.log("image url :", this.image, "video url :", this.video)};
	}

	render() {
		this.DOM.innerHTML = `
         <h3>${this.title}</h3>
         <p>${this.likes}</p>
      `;

      //Photo or video display
      let media = null;
      if (this.mediaType === "image") {
         media = document.createElement("img");
         media.src = this.image;
         media.alt = "";
      } 
      else {
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
      
	}
}
