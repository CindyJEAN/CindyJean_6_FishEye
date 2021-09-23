// const header = document.createElement("header");
// document.body.appendChild(header);




class Index{
  constructor(domTarget, dataManager){
    this.DOM= domTarget;
    this.data = dataManager;
    this.render();
  }

  async render(){
    const tags = await this.data.photographersTags();
    const indexMain = document.createElement("main");


    new Header(this.DOM, tags, this.clickOnTag);
    document.body.appendChild(indexMain);
  }

  clickOnTag(tagName){
    console.log(tagName);
  }
}
