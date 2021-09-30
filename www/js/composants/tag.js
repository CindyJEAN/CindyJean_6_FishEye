class Tag{
  
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   * @param   {String}  tagName    text inside the tag
   * @param   {Function}  callback   click on tag function
   *
   */
  constructor(domTarget, tagName, callback){
    this.DOM = document.createElement("span");
    this.DOM.className = "tag";
    domTarget.appendChild(this.DOM);
    this.DOM.innerText = "#"+tagName;
    this.DOM.onclick = ()=> callback(tagName);
  }
}