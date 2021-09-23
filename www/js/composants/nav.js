class Nav{
  constructor(domTarget, tags, callback){
    this.DOM = document.createElement("nav");
    domTarget.appendChild(this.DOM);
    tags.forEach(tag => {
      new Tag(this.DOM, tag, callback);
    });
  }
}