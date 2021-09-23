const nav = document.createElement("nav");
// header.appendChild(nav);


class Header{
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   *
   */
  constructor(domTarget){
    this.DOM = document.createElement("header");
    domTarget.appendChild(this.DOM);
    this.render();
  }

  render(){
    this.DOM.innerHTML = `
    <a href="index.html"><img src="photos/logo.svg" alt="Logo FishEye" /></a>
    `;
  }
}
