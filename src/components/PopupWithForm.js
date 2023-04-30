import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popupContainer.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._popupContainer.querySelector(".popup__submit");
  }
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(data){
    this._inputList.forEach((input) =>{
        input.value = data[input.name]
    })}

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._formSubmit(this._getInputValues());
    // this.close();
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitForm)
  }

  close(){
    super.close();
    this._form.reset();
  }

  changeSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }
}
