import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data) {
    this._data = data;
    const markUp = this._generateMarkup();
    this.renderSpinner();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  renderSpinner() {
    const markUp = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderError(message = this._errorMessage) {
    const markUp = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  renderSuccess(message = this._message) {
    const markUp = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
}
