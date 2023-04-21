import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._picture = this._popupContainer.querySelector("#previewImage");
    this._pictureDescription = this._popupContainer.querySelector(
      "#previewDescription"
    );
  }

  open(name, link) {
    this._picture.src = link;
    this._picture.alt = name;
    this._pictureDescription.innerText = name;
    super.open();
  }
}
