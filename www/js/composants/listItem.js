export default class ListItem{
  
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   * @param   {String}  name    name of filter
   * @param   {Function}  callback   sortMedia function
   *
   */
  constructor(domTarget, name, callback=null){
    this.DOM = document.createElement("li");
    domTarget.appendChild(this.DOM);
    this.DOM.innerText = name;
    this.DOM.onclick = () => callback(name);
  }
}