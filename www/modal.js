/**
 * [querySelector description]
 *
 * @type   {HTMLElement}  .lightboxModal  [.lightboxModal description]
 *
 */
const lightbox = document.querySelector(".lightboxModal");
const mediaArticles = document.querySelectorAll(".mediaArticle > img");
/** */
const closing = document.querySelector(".close");

mediaArticles.forEach((photo) => photo.addEventListener("click", openModal));
closing.addEventListener("click", closeModal);


function openModal() {
  lightbox.style.display = "flex";
}

function closeModal() {
  lightbox.style.display = "none";
}