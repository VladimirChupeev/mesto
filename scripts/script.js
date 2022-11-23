// Кнопка редактирования профиля
const profileEditButton = document.querySelector(".profile__edit");
// popup профиля
const profilePopup = document.querySelector("#profile");
// форма профиля
const profileForm = document.querySelector(".popup__profile-form");
// кнопка закрытия формы
const popupProfileCloseButton = document.querySelector(".popup__close");
// Верхний инпут
const nameInputElement = document.querySelector("#name");
// Нижний инпут
const hobbyProfileElement = document.querySelector("#hobby");
// Кнопка добавления картинки
const addbutton = document.querySelector(".profile__add");
// кнопка сохранить
const submit = document.querySelector(".popup__submit");
// строка имени и занятия
const profileName = document.querySelector(".profile__name");
const profileHobby = document.querySelector(".profile__hobby");

profileEditButton.addEventListener("click", openProfilePopup);
popupProfileCloseButton.addEventListener("click", closeProfilePopup);
profileForm.addEventListener("submit", formSubmitHandler);
// открытие и закрытие попапа
function openProfilePopup() {
  profilePopup.classList.add("popup_opened");
  fillProfileInputs();
}
function closeProfilePopup() {
  profilePopup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const nameInput = nameInputElement.value;
  const hobbyInput = hobbyProfileElement.value;

  profileName.textContent = nameInput;
  profileHobby.textContent = hobbyInput;
  closeProfilePopup();
}

function fillProfileInputs() {
  nameInputElement.value = profileName.textContent;
  hobbyProfileElement.value = profileHobby.textContent;
}
