class Header {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 *
	 */
	constructor(domTarget, tags, callback) {
		this.DOM = document.createElement("header");
		domTarget.appendChild(this.DOM);
		this.tagList = tags;
		this.callback = callback;
		console.log("tagList", this.tagList);
		console.log("callback", this.callback);
		// tags === null && callback === null ? this.render() : this.indexRender();
		this.render();
	}

	render() {
		this.DOM.innerHTML = `
    <a href="index.html"><img src="photos/logo.svg" alt="Logo FishEye" /></a>
    `;
		this.tagList !== null &&
			this.callback !== null &&
			new Nav(this.DOM, this.tagList, this.callback);
	}
	// indexRender() {
	// 	this.DOM.innerHTML = `
  //   <a href="index.html"><img src="photos/logo.svg" alt="Logo FishEye" /></a>
  //   `;
	// 	new Nav(this.DOM, this.tagList, this.callback);
	// }
	// render(){
	//   this.DOM.innerHTML = `
	//   <a href="index.html"><img src="photos/logo.svg" alt="Logo FishEye" /></a>
	//   `;
	//   new Nav(this.DOM, this.tagList, this.callback);
	// }
}
