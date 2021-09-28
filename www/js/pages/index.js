class Index{
  constructor(domTarget, dataManager){
    this.DOM= domTarget;
    this.data = dataManager;
    this.render();
  }

  async render(){
    const tags = await this.data.photographersTags();
    // const indexMain = document.createElement("main");
    const profileData = await this.data.photographers();

    new Header(this.DOM, tags, this.clickOnTag);
    // document.body.appendChild(indexMain);

    new Main(this.DOM, "index-main", profileData);
  }

  clickOnTag(tagName){
    console.log(tagName);
  }
}
