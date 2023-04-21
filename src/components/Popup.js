export default class Popup {
  constructor(popupSelector) {
    this._popupContainer = document.querySelector(popupSelector);
  }
  open() {
    this._popupContainer.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupContainer.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popupContainer.addEventListener("click", this._handleClickOutsidePopup);
  }

  _handleClickOutsidePopup = (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      this.close();
    }
  }
}
