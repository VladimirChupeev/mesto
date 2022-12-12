
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
const addButton = document.querySelector(".profile__add");
const popupAddTitleInput = addCardPopup.querySelector("#title");
const popupAddImageInput = addCardPopup.querySelector("#image-url");
const albumTemplate = document.querySelector("#albumTemplate").content;

// строка имени и занятия
const profileName = document.querySelector(".profile__name");
const profileHobby = document.querySelector(".profile__hobby");

// открытие и закрытие попапа редактирования профиля
function openPopup (popupHtml){
  popupHtml.classList.add("popup_opened");
}
function closePopup (popupHtml){
  popupHtml.classList.remove("popup_opened");
}


function openProfilePopup(popupElement) {
 openPopup(popupElement)
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
  renderCard(popupAddTitleInput.value, popupAddImageInput.value);
  popupAddTitleInput.value = ""
  popupAddImageInput.value = ""
  closePopup(addPopup);

}

function fillProfileInputs() {
  nameInputElement.value = profileName.textContent;
  hobbyProfileElement.value = profileHobby.textContent;
}


function renderCard(name, link) {
  const card = generateCard(name, link);
  cards.prepend(card);
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

albumCards.reverse().forEach((element) => renderCard(element.name, element.link));

// addEventListener
profileEditButton.addEventListener("click", () => {openProfilePopup(profilePopup)});
popupProfileCloseButton.addEventListener("click", () => {closePopup(profilePopup)});
profileForm.addEventListener("submit", formProfileSubmitHandler);
addCardForm.addEventListener("submit", formAddSubmitHandler);
addButton.addEventListener("click", () => {openPopup(addPopup)});
popupAddCloseButton.addEventListener("click", () => {closePopup(addPopup)});
popupPreviewCloseButton.addEventListener("click", () => {closePopup(previewPopup)});