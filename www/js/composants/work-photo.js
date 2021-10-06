export default class WorkPhoto {
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   *
   */
	constructor(domTarget) {
		this.DOM = document.createElement("div");
		domTarget.appendChild(this.DOM);
		this.render();
	}

	render() {
		this.DOM.innerHTML = `
      <img src="photos/media/<%- image %>.jpg" alt=""/>
      <h3><%- title %></h3>
      <p><%- likes %></p>
      `;
	}
}
