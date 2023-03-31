export class FormValidator {
  constructor(selectorElements, form) {
    this._selectorElements = selectorElements;
    this._form = form;
  }

  enableValidation = () => {
    this._setEventListeners();
  };

  _setEventListeners = () => {
    const inputList = Array.from(
      this._form.querySelectorAll(this._selectorElements.inputSelector)
    );
    const buttonElement = this._form.querySelector(
      this._selectorElements.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
    const checkInputValidity = this._checkInputValidity;
    const toggleButtonState = this._toggleButtonState;
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._selectorElements.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(
        this._selectorElements.inactiveButtonClass
      );
      buttonElement.removeAttribute("disabled");
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
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
}
