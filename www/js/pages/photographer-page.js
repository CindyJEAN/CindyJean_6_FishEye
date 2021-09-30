class PhotographerPage{
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget    [domTarget description]
   */
  constructor(domTarget, dataManager){
    this.DOM = domTarget;
    this.data = dataManager;
    this.render();
  }

  async render(){
    const tags = null;
    const profileData = await this.data.photographers();

    new Header(this.DOM, null, null);
    // document.body.appendChild(indexMain);

    new Main(this.DOM, "photographer-main", profileData);
  }
}