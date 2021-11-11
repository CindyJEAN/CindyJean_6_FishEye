import Form from "./form.js";

export default class Button{
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   * @param   {String}  text       text inside the button : Contactez-moi or Envoyer
   */
  constructor(domTarget, text, callback){
    this.DOM = document.createElement("button");
    domTarget.appendChild(this.DOM);
    this.DOM.className = "contact";
    this.DOM.innerText = text;
    this.domTarget = domTarget;

    if (text === "Envoyer") {
      this.DOM.onclick = (e) => callback(e);
      return;
    }
    this.DOM.onclick = () => callback("formModal");
  }
}