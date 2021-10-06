export default class Button{
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   * @param   {String}  text       text inside the button : Contactez-moi or Envoyer
   */
  constructor(domTarget, text){
    this.DOM = document.createElement("button");
    domTarget.appendChild(this.DOM);
    this.DOM.className = "contact";
    this.DOM.innerText = text;
  }
}