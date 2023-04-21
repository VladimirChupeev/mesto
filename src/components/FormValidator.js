export class FormValidator {
  constructor(selectorElements, form) {
    this._selectorElements = selectorElements;
    this._form = form;
  }

  enableValidation = () => {
    this._setEventListeners();
  };

  _setEventListeners = () => {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._selectorElements.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._selectorElements.submitButtonSelector
    );
    this._toggleButtonState();
    const checkInputValidity = this._checkInputValidity;
    const toggleButtonState = this._toggleButtonState;
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(inputElement);
        toggleButtonState();
      });
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
     this.disableSubmitButton();
    } else {
        this._buttonElement.classList.remove(
        this._selectorElements.inactiveButtonClass
      );
      this._buttonElement.removeAttribute("disabled");
    }
  };

  disableSubmitButton() {
    this._buttonElement.classList.add(this._selectorElements.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectorElements.inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectorElements.inputErrorClass);
    errorElement.textContent = "";
  };
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
  }
}

