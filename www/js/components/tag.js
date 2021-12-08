export default class Tag {
	/**
	 *
	 * @param   {HTMLElement}  domTarget  
	 * @param   {String}  tagName    text inside the tag
	 * @param   {Function}  callback   click on tag function
	 *
	 */
	constructor(domTarget, tagName, callback = null) {
		this.DOM = document.createElement("span");
		this.DOM.classList.add("tag");
		domTarget.appendChild(this.DOM);
		this.DOM.innerText = "#" + tagName;
		this.DOM.ariaLabel = "Tag " + tagName;
		this.DOM.setAttribute("role", "Link");
		this.DOM.tabIndex = 0;

		this.DOM.onclick = () => {
			this.toggleFilter();
			if (callback) {
				callback(tagName);
				return;
			}
			// @ts-ignore
			window.changePage("index", tagName);
		};
		this.DOM.onkeydown = (e) => {
			if (e.key === "Enter") {
				this.toggleFilter();
				if (callback) {
					callback(tagName);
					return;
				}
				// @ts-ignore
				window.changePage("index", tagName);
			}
		};

		let redirectedTag = this.extractAtiveTag();
		if (tagName === redirectedTag) {
			this.toggleFilter();
		}
	}

	/**
	 * gets the tag when redirected to the index by clicking on a tag
	 *
	 * @return  {String}  active tag from redirection
	 */
	extractAtiveTag() {
		let redirectedTag = window.location.hash.slice(1).split("/")[1];
		return redirectedTag;
	}

	/**
	 * sets the style for active or non active tag, 
	 * and sets the aria-current attribute to true or false
	 *
	 */
	toggleFilter() {
		this.DOM.classList.toggle("active");
		const current = this.DOM.hasAttribute("aria-current");
		if (current) {
			this.DOM.setAttribute("aria-current", "false");
			return;
		}
		this.DOM.setAttribute("aria-current", "true");
	}
}
