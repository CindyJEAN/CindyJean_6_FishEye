

export default class Lightbox {
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   *
   */
  constructor(domTarget, media) {
    this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
    this.image = "content/media/" + media.image;
    this.title = media.title;
    // this.video = media.video;

    this.render();
  }

  render() {
    this.DOM.innerHTML = `
      <div class="lightbox">
        <img src=${this.image} alt="" />
        <h3>${this.title}</h3>
        <button class="left"><i class="fas fa-chevron-left"></i></button>
        <button class="right"><i class="fas fa-chevron-right"></i></button>
        <button class="close"><i class="fas fa-times"></i></button>
      </div>
      `;
  }
}