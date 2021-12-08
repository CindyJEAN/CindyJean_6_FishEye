import Nav from "../components/nav.js";
import Button from "./button.js";
export default class Header {
	/**
	 *
	 * @param   {HTMLElement}  domTarget  
	 * @param   {Array} [tags]				
	 * @param   {Function} [callback]
	 *
	 */
	constructor(domTarget, tags = null, callback = null) {
		this.DOM = document.createElement("header");
		domTarget.appendChild(this.DOM);
		this.tagList = tags;
		this.callback = callback;
		this.render();
	}

	render() {
		this.DOM.innerHTML = /*HTML*/`
    <a href="index.html" aria-label="To Fisheye Home page"><img src="content/logo.svg" alt="Fisheye Home page"/></a>
    `;
		if (this.tagList === null) return;
		new Nav(this.DOM, this.tagList, this.callback);

		//---- Redirect to main content button/link ----//
		this.btn = document.createElement("button");
		this.DOM.appendChild(this.btn);
		this.btn.className = "redirect";
		this.btn.innerText = "Passer au contenu";

		this.btn.setAttribute("aria-hidden", "true");
		this.btn.onclick = () => {
			document.getElementById("indexMainContent").scrollIntoView();
		};
		this.btnVisible = false;
		window.addEventListener("scroll", this.scrollHandler.bind(this));
	}

	/**
	 * Checks the scroll on page and reveals or hides button "passer au contenu"
	 *
	 * @param   {Event}  evt  
	 *
	 */
	scrollHandler(evt) {
		const shouldBeVisible = window.scrollY > 300 ? true : false;
		if (shouldBeVisible === this.btnVisible) return;
		this.btnVisible = shouldBeVisible;
		this.btn.classList.toggle("visible");
	}
}
