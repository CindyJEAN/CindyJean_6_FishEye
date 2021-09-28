class Main{
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   * @param   {String}  className  className of the main tag : "index-main" or "photographer-main"
   *
   */
  constructor(domTarget, className, profiles){
    this.DOM = document.createElement("main");
    domTarget.appendChild(this.DOM);
    this.DOM.className = className;
    this.profiles = profiles;
    className === "index-main" ? this.indexMainRender() : this.photographerMainRender(); 
    // this.indexMainRender();
  }

  indexMainRender(){
    this.DOM.innerHTML = `<h1>Nos photographes</h1>`;
    console.log(this.profiles);
    // new Profile(this.DOM, "MimiKeel", this.profileData);
    this.profiles.forEach(profileData => {
      new Profile(this.DOM, profileData);
    })
  }

  photographerMainRender(){
    this.DOM.innerHTML = `<h1>Photographer page</h1>`;
  }
}