export default class Tag{
  
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   * @param   {String}  tagName    text inside the tag
   * @param   {Function}  callback   click on tag function
   *
   */
  constructor(domTarget, tagName, callback=null){
    this.DOM = document.createElement("span");
    this.DOM.classList.add("tag");
    domTarget.appendChild(this.DOM);
    this.DOM.innerText = "#"+tagName;

    this.DOM.onclick = () => {
      this.toggleFilter();
      if (callback) {
        callback(tagName);
        return;
      }
      window.changePage("index", tagName);
    };
  }

  toggleFilter() {
    this.DOM.classList.toggle("active");
  }
}