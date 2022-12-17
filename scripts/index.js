// Валидация
debugger
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement,inputElement,inputElement.validationMessage,obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, obj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
};





// import * as validate from './validate.js'
const albumCards = [
  {
    name: "Байкал",
    link: "./images/photo-grid-arisa.jpg",
  },
  {
    name: "Эльбрус",
    link: "./images/photo-grid-elbrus.jpg",
  },
  {
    name: "Куршская коса",
    link: "./images/place-kosa.jpg",
  },
  {
    name: "Сочи",
    link: "./images/photo-grid-sochi.jpg",
  },
  {
    name: "Корелия",
    link: "./images/place-karelia.jpg",
  },
  {
    name: "Домбай",
    link: "./images/dombai.svg",
  },
];

// Кнопка редактирования профиля
const profileEditButton = document.querySelector(".profile__edit");
// popup профиля
const profilePopup = document.querySelector("#profile");
//popup добавления карты
const addCardPopup = document.querySelector("#add");
// popup просмотра картинки
const previewPopup = document.querySelector("#previewPopup");

const pictureDescriptionPopup = previewPopup.querySelector(
  "#previewDescription"
);
// форма профиля
const profileForm = document.querySelector(".popup__profile-form");
// форма добавления карточки
const addCardForm = document.querySelector(".popup__add-form");

const cards = document.querySelector("#albumCards");

// кнопка закрытия формы
const popupProfileCloseButton = profilePopup.querySelector(".popup__close");
const popupAddCloseButton = addCardPopup.querySelector(".popup__close");
const popupPreviewCloseButton = previewPopup.querySelector(".popup__close");

// Input профиля
const nameInputElement = document.querySelector("#name");
const hobbyProfileElement = document.querySelector("#hobby");

// Кнопка добавления картинки
const addPopup = document.querySelector("#add");
const addButton = document.querySelector(".profile__add");
const popupAddTitleInput = addCardPopup.querySelector("#title");
const popupAddImageInput = addCardPopup.querySelector("#image-url");
const albumTemplate = document.querySelector("#albumTemplate").content;

// строка имени и занятия
const profileName = document.querySelector(".profile__name");
const profileHobby = document.querySelector(".profile__hobby");

// открытие и закрытие попапов 
function openPopup(htmlPopup) {
  htmlPopup.classList.add("popup_opened");
  htmlPopup.addEventListener("mousedown", handleClickOutsidePopup);
  document.addEventListener("keydown", handleEscapePressPopup);
}
function closePopup(htmlPopup) {
  htmlPopup.classList.remove("popup_opened");
  htmlPopup.removeEventListener("mousedown", handleClickOutsidePopup);
  document.removeEventListener("keydown", handleEscapePressPopup);
}
function handleClickOutsidePopup(evt) {
  if (
    evt.target.classList.contains("popup_opened") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

function handleEscapePressPopup(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

function resetForm(element) {
  const currentForm = element.querySelector(".form");
  if (currentForm) {
    currentForm.reset();
  }
}

// селекторы для валидации
const selectorElements = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
};

function openProfilePopup () {
  openPopup(profilePopup);
  fillProfileInputs();
}

function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  const nameInput = nameInputElement.value;
  const hobbyInput = hobbyProfileElement.value;

  profileName.textContent = nameInput;
  profileHobby.textContent = hobbyInput;
  closePopup(profilePopup);
}

function fillProfileInputs() {
  nameInputElement.value = profileName.textContent;
  hobbyProfileElement.value = profileHobby.textContent;
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();

  renderCard(popupAddTitleInput.value, popupAddImageInput.value, true);
  closePopup(addCardPopup);
  resetForm(addCardPopup);
}

function fillProfileInputs() {
  nameInputElement.value = profileName.textContent;
  hobbyProfileElement.value = profileHobby.textContent;
}

function renderCard(name, link) {
  const card = generateCard(name, link);
  cards.prepend(card);
}

function openAddCardPopup () {
  openPopup(addCardPopup);
  setButttonStateForAddCardForm();
}

function generateCard(name, link) {
  const card = albumTemplate.querySelector(".album__element").cloneNode(true);

  const image = card.querySelector(".album__foto");
  image.alt = name;
  image.src = link;
  image.addEventListener("click", (event) => {
    const picture = previewPopup.querySelector("#previewImage");
    const clickedPicture = event.target;
    picture.src = clickedPicture.src;
    picture.alt = name;
    pictureDescriptionPopup.innerText = clickedPicture.alt;
    openPopup(previewPopup);
  });

  const cardText = card.querySelector(".album__text");
  cardText.innerText = name;
  card.querySelector(".album__like").addEventListener("click", (event) => {
    const className = "album__like_active";
    const classList = event.target.classList;

    classList.toggle(className);
  });

  card.querySelector(".album__delete").addEventListener("click", (event) => {
    event.target.closest(".album__element").remove();
  });

  return card;
}

function setButttonStateForAddCardForm() {
  const inputList = Array.from(addCardForm.querySelectorAll('.popup__input'));
  const buttonElement = addCardForm.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement, selectorElements);
}


albumCards.reverse().forEach((element) => renderCard(element.name, element.link));

// addEventListener
profileEditButton.addEventListener("click", openProfilePopup);
profileForm.addEventListener("submit", formProfileSubmitHandler);
addButton.addEventListener('click',openAddCardPopup);
addCardForm.addEventListener('submit',formAddSubmitHandler);

fillProfileInputs();
enableValidation(selectorElements);










