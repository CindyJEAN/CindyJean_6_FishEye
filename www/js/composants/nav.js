class Nav{
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
    tags.forEach(tag => {
      new Tag(this.DOM, tag, callback);
    });
  }
}