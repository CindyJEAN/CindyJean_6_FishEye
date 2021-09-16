/**
 * [querySelector description]
 *
 * @type   {HTMLElement}  .lightboxModal  [.lightboxModal description]
 *
 */
const lightbox = document.querySelector(".lightboxModal");
const workPhotos = document.querySelectorAll(".workPhoto > img");
/** */
const closing = document.querySelector(".close");

workPhotos.forEach((photo) => photo.addEventListener("click", openModal));
closing.addEventListener("click", closeModal);


function openModal() {
  lightbox.style.display = "flex";
}

function closeModal() {
  lightbox.style.display = "none";
}