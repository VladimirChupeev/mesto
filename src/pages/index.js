import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Section from "../components/Section.js";
import baikal from "../images/photo-grid-arisa.jpg";
import elbrus from "../images/photo-grid-elbrus.jpg";
import kosa from "../images/place-kosa.jpg";
import sochi from "../images/photo-grid-sochi.jpg";
import karelia from "../images/place-karelia.jpg";
import dombai from "../images/dombai.svg";
import { selectorElements } from "../components/selectorElements.js";

const albumCards = [
  {
    name: "Байкал",
    link: baikal,
  },
  {
    name: "Эльбрус",
    link: elbrus,
  },
  {
    name: "Куршская коса",
    link: kosa,
  },
  {
    name: "Сочи",
    link: sochi,
  },
  {
    name: "Корелия",
    link: karelia,
  },
  {
    name: "Домбай",
    link: dombai,
  },
];
const profileName = document.querySelector(".profile__name");
const profileHobby = document.querySelector(".profile__hobby");
// Кнопка редактирования профиля
const profileEditButton = document.querySelector(".profile__edit");

const cardList = new Section(
  {
    items: albumCards,
    renderer: (card) => {
      const cardElement = createCard(card.name, card.link);
      cardList.addItemAppend(cardElement);
    },
  },
  "#albumCards"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name" ,
  hobbySelector: ".profile__hobby",
});
const popupProfileForm = new PopupWithForm("#profile", (data) => {
  userInfo.setUserInfo(data._name, data._hobby);
});



const popupAddCardForm = new PopupWithForm("#add", (data) => {
  const cardElement = createCard(data.name, data.link);
  cardList.addItemPrepend(cardElement);
});

const popupPicture = new PopupWithImage("#previewPopup");

const formList = Array.from(
  document.querySelectorAll(selectorElements.formSelector)
);

const formValidators = {};


// Кнопка добавления картинки
const buttonAdd = document.querySelector(".profile__add");



// Включение прослушек
popupProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();
popupPicture.setEventListeners();


function createCard(name, link) {
  const card = new Card(name, link, "#albumTemplate", handlePictureClick);
  const cardElement = card.createCard();
  return cardElement;
}
function handlePictureClick(name, link) {
  popupPicture.open(name, link);
}


profileEditButton.addEventListener("click", () => {
  popupProfileForm.setInputValues(userInfo.getUserInfo());
  popupProfileForm.open();
});
buttonAdd.addEventListener("click", () => {
  popupAddCardForm.open();
  console.log(formValidators)
  formValidators["popup__add-form"].resetValidation();
});


formList.forEach((form) => {
  const formElementValidation = new FormValidator(selectorElements, form);
  formElementValidation.enableValidation();
  const formName = form.getAttribute("name");
  formValidators[formName] = formElementValidation;
});
cardList.renderer();

