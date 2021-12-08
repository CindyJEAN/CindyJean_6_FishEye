import Tag from "../components/tag.js"
export default class Nav{
  /**
   *
   * @param   {HTMLElement}  domTarget  
   * @param   {Array}  tags       Array of tags
   * @param   {Function}  callback   Click on tag function
   *
   */
  constructor(domTarget, tags, callback){
    this.DOM = document.createElement("nav");
    domTarget.appendChild(this.DOM);
    this.DOM.ariaLabel = "catégories de photographes";
    this.DOM.setAttribute("role", "navigation");
    tags.forEach(tag => {
      new Tag(this.DOM, tag, callback);
    });
  }
}