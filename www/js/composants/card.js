class Card{

  /**
   * le titre de la carte
   * @type {String | null}
   */
  title = null;

  /**
   * le titre de la carte
   * @type {String | null}
   */
  description = null;

  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   * @param   {Object}  data       [data description]
   * @param   {String}  data.title
   * @param   {String}  data.description
   */
  constructor(domTarget, data){
    this.DOM = document.createElement("card");
    this.DOM.onclick = this.click.bind(this);
    this.DOM.className="kjkljlkj";
    // this.DOM.onclick = ()=>this.click();
    domTarget.appendChild(this.DOM);
    for ( const [key, value] of Object.entries(data)){
      this[key] = value;
    }
    this.render();
  }

  render(){
    this.DOM.innerHTML = `
      <h1 class="test">${this.title}</h1>
      <p>${this.description}</p>
    `;
  }

  click(){
    console.log(this);
    this.title+=" :)";
    this.render();
  }
}

