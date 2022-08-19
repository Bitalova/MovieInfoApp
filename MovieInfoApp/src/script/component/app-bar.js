class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="header-container">
        <div id="appBar" class="app-bar">
        <i class="fa fa-clapperboard"></i>
        <h2>MovieInfoApp</h2>
      </div>
      
      <div class="clock">
            <span class="time"></span>
            <span class="date"></span>
        </div>
        </div>
        `
  }
}

customElements.define('app-bar', AppBar);