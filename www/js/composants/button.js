import Form from "./form.js";

export default class Button{
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  
   * @param   {String}  text            text inside the button : Contactez-moi or Envoyer
   * @param   {Function}  callback      validateForm or openForm depending on the button
   */
  constructor(domTarget, text, callback){
    this.DOM = document.createElement("button");
    domTarget.appendChild(this.DOM);
    this.DOM.className = "contact";
    this.DOM.innerText = text;

    if (text === "Envoyer") {
      this.DOM.ariaLabel = "send";
      this.DOM.onclick = (e) => callback(e);
      return;
    }
    //Open form on click on "Contactez-moi" button
    this.DOM.onclick = () => callback("formModal");
  }
}