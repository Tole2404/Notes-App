class Bar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
        .header-bar{
            background-color: var(--bg-primary);
            padding: 10px;
            text-align: center;
            color: var(--white-color);
            font-family: var(--dancing-font);
            font-size: 20px;
        }
      
        `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
          <div class="header-bar">
            <h1 class="title-bar">Notes Apps</h1>
          </div>
        `;
  }
}

customElements.define("bar-custom", Bar);
