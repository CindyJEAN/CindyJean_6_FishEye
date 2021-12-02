import Tag from "../composants/tag.js"
export default class Nav{
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   * @param   {Array}  tags       Array of tags
   * @param   {Function}  callback   Click on tag function
   *
   */
  constructor(domTarget, tags, callback){
    this.DOM = document.createElement("nav");
    domTarget.appendChild(this.DOM);
    this.DOM.ariaLabel = "photographer categories";
    this.DOM.setAttribute("role", "navigation");
    tags.forEach(tag => {
      new Tag(this.DOM, tag, callback);
    });
  }
}