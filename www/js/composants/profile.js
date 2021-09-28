

class Profile{
  // /**
  //  * @type {String} url of the photo
  //  */
  // src = "photos/id/";


  constructor(domTarget, src, profileData){
    this.DOM = document.createElement("article");
    domTarget.appendChild(this.DOM);
    this.DOM.className = "profile";
    this.profileData = profileData;
    this.src = "photos/id/" + profileData.portrait;

    const container = document.createElement("div");
    const profilePhoto = document.createElement("img");
    profilePhoto.className = "profile-photo";
    profilePhoto.src = this.src;

    this.DOM.appendChild(container);
    container.appendChild(profilePhoto);
    
    // this.render();
  }

  // render(){

  // }
}