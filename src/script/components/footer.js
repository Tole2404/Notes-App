class Footer extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
            .footer-custom {
                background-color: var(--bg-primary);
                padding: 10px;
                text-align: center;
                color: var(--white-color);
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
            <div class="footer-custom">
                <p>Tunggul Bayu Kusuma | Notes Apps.</p>
            </div>
          `;
  }
}

customElements.define("footer-custom", Footer);
