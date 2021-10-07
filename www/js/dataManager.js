/**
 * @typedef {Object} photographerProfile
	 * @property   {String}  portrait  url of the profile photo
	 * @property   {String}  name  name of the photographer
	 * @property   {String}  city  address city
	 * @property   {String}  country  address country
	 * @property   {String}  tagline  tagline of the photographer
	 * @property   {Array}  tags  tags of the photographer
	 * @property   {Array}  price  price
 */

/**
 * @typedef  {Object}  media
 */

/**
 * @typedef  {null | Object}  allData
 * @property {Array.<photographerProfile>}  photographers
 * @property {Array.<media>}   media
 */
export default class DataManager{

  constructor(src){
    /**
     * all the data (photographers and media)
     *
     * @type {allData}
     */
    this.data = null;
    this.src = src;
  }

  async getAllData(){
    const response = await fetch(this.src);
    this.data = await response.json();
  }

  async photographersTags(){
    if (this.data === null) await this.getAllData();
    let tags = [];
    this.data.photographers.forEach(photographer => {
      tags = tags.concat(photographer.tags);
    });
    return [...new Set(tags)];
  }

  /**
   * [getPhotographersList description]
   *
   * @param   {Array}  filters  [filters description]
   *
   * @return  {Promise.<Array.<photographerProfile>>}           [return description]
   */
  async getPhotographersList(filters){
    if (this.data === null) await this.getAllData();
    if (filters.length === 0) return this.data.photographers;
    let photographers = [];
    this.data.photographers.forEach(photographer => {
      filters.forEach(filter => {
        if (photographer.tags.indexOf(filter) !== -1)  photographers.push(photographer);
      });
    });
    return [...new Set(photographers)];
  }

  async getPhotographerById(id){
    if (this.data === null) await this.getAllData();
    for (const photographer of this.data.photographers){
      if (photographer.id === id) return photographer;
    }
  }
}