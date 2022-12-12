// Массив
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

const previewPopup = document.querySelector("#previewPopup") 

const pictureDescriptionPopup = previewPopup.querySelector("#previewDescription")
// форма профиля
const profileForm = document.querySelector(".popup__profile-form");
// форма профиля
const addCardForm = document.querySelector(".popup__add-form");

const cards = document.querySelector("#albumCards");
// кнопка закрытия формы
const popupProfileCloseButton = profilePopup.querySelector(".popup__close");
const popupAddCloseButton = addCardPopup.querySelector(".popup__close");
const popupPreviewCloseButton = previewPopup.querySelector(".popup__close")
// Верхний инпут
const nameInputElement = document.querySelector("#name");
// Нижний инпут
const hobbyProfileElement = document.querySelector("#hobby");
// Кнопка добавления картинки
const addPopup = document.querySelector("#add");
const addbutton = document.querySelector(".profile__add");
const popupAddTitleInput = addCardPopup.querySelector("#title");
const popupAddImageInput = addCardPopup.querySelector("#image-url");
const albumTemplate = document.querySelector("#albumTemplate").content;
// кнопка сохранить

const submit = document.querySelector(".popup__submit");
// строка имени и занятия
const profileName = document.querySelector(".profile__name");
const profileHobby = document.querySelector(".profile__hobby");

// addEventListener
profileEditButton.addEventListener("click", openProfilePopup);
popupProfileCloseButton.addEventListener("click", closeProfilePopup);
profileForm.addEventListener("submit", formProfileSubmitHandler);
addCardForm.addEventListener("submit", formAddSubmitHandler);
addbutton.addEventListener("click", openAddPopup);
popupAddCloseButton.addEventListener("click", closeAddPopup);
popupPreviewCloseButton.addEventListener("click", closePreviewPopup);

// открытие и закрытие попапа редактирования профиля
function openProfilePopup() {
  profilePopup.classList.add("popup_opened");
  fillProfileInputs();
}
function closeProfilePopup() {
  profilePopup.classList.remove("popup_opened");
}

function formProfileSubmitHandler(evt) {
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

// Попап добавления картинки
function openAddPopup() {
  addPopup.classList.add("popup_opened");
}

// Попап картинки
function openPreviewPopup() {
  previewPopup.classList.add("popup_opened");
}

function closePreviewPopup() {
  previewPopup.classList.remove("popup_opened");
}


function closeAddPopup() {
  addPopup.classList.remove("popup_opened");
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  renderCard(popupAddTitleInput.value, popupAddImageInput.value);
  closeAddPopup();
}

function fillProfileInputs() {
  nameInputElement.value = profileName.textContent;
  hobbyProfileElement.value = profileHobby.textContent;
}

// активный лайк
function tapLike() {
  addLike.classList.add("album__like_active");
}

function renderCard(name, link) {
  const card = generateCard(name, link);
  cards.append(card);
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
    pictureDescriptionPopup.innerText = clickedPicture.alt;
    openPreviewPopup();
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

albumCards.forEach((element) => renderCard(element.name, element.link));
