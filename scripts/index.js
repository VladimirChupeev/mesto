import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
const cardPopupAdd = document.querySelector("#add");
// popup просмотра картинки
const previewPopup = document.querySelector("#previewPopup");

const pictureDescriptionPopup = previewPopup.querySelector(
  "#previewDescription"
);

// селекторы для валидации
const selectorElements = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
};
const formList = Array.from(
  document.querySelectorAll(selectorElements.formSelector)
);

const formValidators = {};

// форма профиля
const profileForm = document.querySelector(".popup__profile-form");
// форма добавления карточки
const cardFormAdd = document.querySelector(".popup__add-form");
const cardsContainer = document.querySelector("#albumCards");

// кнопка закрытия формы
const popupProfileCloseButton = profilePopup.querySelector(".popup__close");
const popupAddCloseButton = cardPopupAdd.querySelector(".popup__close");
const popupPreviewCloseButton = previewPopup.querySelector(".popup__close");
const picture = previewPopup.querySelector("#previewImage");
const inputList = Array.from(cardFormAdd.querySelectorAll(".popup__input"));

// Input профиля
const nameInputElement = document.querySelector("#name");
const hobbyProfileElement = document.querySelector("#hobby");

// Кнопка добавления картинки
const popupAdd = document.querySelector("#add");
const buttonAdd = document.querySelector(".profile__add");
const popupAddTitleInput = cardPopupAdd.querySelector("#title");
const popupAddImageInput = cardPopupAdd.querySelector("#image-url");
// const albumTemplate = document.querySelector("#albumTemplate").content;

// строка имени и занятия
const profileName = document.querySelector(".profile__name");
const profileHobby = document.querySelector(".profile__hobby");

const popups = Array.from(document.querySelectorAll(".popup"));

// открытие и закрытие попапов
function openPopup(htmlPopup) {
  htmlPopup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapePressPopup);
}

function closePopup(htmlPopup) {
  htmlPopup.classList.remove("popup_opened");
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

function openProfilePopup() {
  openPopup(profilePopup);
  fillProfileInputs();
}

function handleSubmitProfileForm(evt) {
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

function addFormSubmitHandler(evt) {
  evt.preventDefault();

  renderCard(popupAddTitleInput.value, popupAddImageInput.value);
  closePopup(cardPopupAdd);
  resetForm(cardPopupAdd);
}

function renderCard(name, link) {
  const cardElement = createCard(name, link);
  cardsContainer.prepend(cardElement);
}


function createCard(name, link) {
const card = new Card(name, link, "#albumTemplate", handlePictureClick);
const cardElement = card.createCard();
return cardElement
}


function openCardPopupAdd() {
  openPopup(cardPopupAdd);
  formValidators["popup__add-form"].disableSubmitButton();
}

function handlePictureClick(name, link) {
  picture.src = link;
  picture.alt = name;
  pictureDescriptionPopup.innerText = name;
  openPopup(previewPopup);
}

albumCards
  .reverse()
  .forEach((element) => renderCard(element.name, element.link));

// addEventListener
profileEditButton.addEventListener("click", openProfilePopup);
profileForm.addEventListener("submit", handleSubmitProfileForm);
buttonAdd.addEventListener("click", openCardPopupAdd);
cardFormAdd.addEventListener("submit", addFormSubmitHandler);
popups.forEach((popup) => {
  popup.addEventListener("click", handleClickOutsidePopup);
});

formList.forEach((form) => {
  const formElementValidation = new FormValidator(selectorElements, form);
  formElementValidation.enableValidation();
  const formName = form.getAttribute("name");
  formValidators[formName] = formElementValidation;
});
