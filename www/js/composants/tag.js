class Tag{
  constructor(domTarget, tagName, callback){
    this.DOM = document.createElement("tag");
    domTarget.appendChild(this.DOM);
    this.DOM.innerText = "#"+tagName;
    this.DOM.onclick = ()=> callback(tagName);
  }
}