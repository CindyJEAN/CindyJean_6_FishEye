/**
 * @typedef {Object} photographerProfile
 * @property   {String}  portrait  url of the profile photo
 * @property   {String}  name  name of the photographer
 * @property   {String}  city  address city
 * @property   {String}  country  address country
 * @property   {String}  tagline  tagline of the photographer
 * @property   {Array}  tags  tags of the photographer
 * @property   {Array}  price  price
 * @property   {Number}  id photographer id
 * @property	 {String}	 description photo description
 */

/**
 * @typedef  {Object}  media
 * @property   {Number}  id  media id
 * @property   {Number}  photographerId
 * @property   {String}  title
 * @property   {String}  image
 * @property   {Array}  tags
 * @property   {Number}  likes
 * @property   {String}  video
 * @property   {String}  date
 * @property   {Number}  price
 * @property	 {String}	 description
 */

/**
 * @typedef  {null | Object}  allData
 * @property {Array.<photographerProfile>}  photographers
 * @property {Array.<media>}   media
 */

/**
 * [data description]
 *
 * @type {allData}
 */
let data, src;

/**
 * initializes the data
 *
 * @param   {Object}  source
 *
 */
function init(source) {
  data = null;
  src = source;
}

async function getAllData() {
  const response = await fetch(src);
  data = await response.json();
}

/**
 * @return {Promise.<Array>}   array of tags, without duplicates
 */
async function getPhotographersTags() {
  if (data === null) await getAllData();
  let tags = [];
  data.photographers.forEach((photographer) => {
    tags = tags.concat(photographer.tags);
  });
  return [...new Set(tags)];
}

/**
 * @param   {Array}  filters  tags for filters
 *
 * @return  {Array.<photographerProfile>}    array of photographers' profile, filtered if there are filters given
 */
function getPhotographersList(filters) {
  if (filters.length === 0) return data.photographers;
  const photographers = [];
  data.photographers.forEach((photographer) => {
    filters.forEach((filter) => {
      if (photographer.tags.indexOf(filter) !== -1)
        photographers.push(photographer);
    });
  });
  return [...new Set(photographers)];
}

/**
 * @param   {String}  id
 *
 * @return  {Promise.<photographerProfile>}    photographer profile data
 */
async function getPhotographerById(id) {
  if (data === null) await getAllData();
  for (const photographer of data.photographers) {
    if (photographer.id === id) return photographer;
  }
}

/**
 * @param   {Number}          id
 * @param   {String}          filter
 * @return {Promise.<Array>}
 */
async function getMediaByPhotographerId(id, filter) {
  if (data === null) await getAllData();
  const media = [];
  data.media.forEach((medium) => {
    if (medium.photographerId === id) media.push(medium);
  });

  switch (filter) {
    case "Popularité":
      media.sort((a, b) => b.likes - a.likes);
      break;
    case "Date":
      media.sort((a, b) => {
        const dateB = new Date(b.date);
        const dateA = new Date(a.date);
        return dateB < dateA ? -1 : 1;
      });
      break;
    case "Titre":
      media.sort((a, b) => (b.title < a.title ? 1 : -1));
      break;
    // no default
  }
  return media;
}

export {
  init,
  getPhotographersTags,
  getPhotographersList,
  getPhotographerById,
  getMediaByPhotographerId,
};
