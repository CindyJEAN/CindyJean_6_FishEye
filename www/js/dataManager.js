
class DataManager{
  data = null;

  constructor(src){
    this.src = src;
  }

  async getAllData(){
    const response = await fetch(this.src);
    this.data = await response.json();

  }

  async photographersTags(){
    if (this.data === null) await this.getAllData();
    console.log(this.data)
    let tags = [];
    this.data.photographers.forEach(photographer => {
      tags = tags.concat(photographer.tags);
    });
    return [...new Set(tags)];
  }
}