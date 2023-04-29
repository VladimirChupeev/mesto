import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Section from "../components/Section.js";
import {selectorElements} from "../components/selectorElements.js";
import Api from "../components/api.js";

const api = new Api(
    '57054214-af19-42f9-8344-bd8fd1c2b3c8', 'cohort-64', 'https://mesto.nomoreparties.co/v1'
)

//переменные
let userInfo;
let cardList;
let currentCardForDelete;

// Все валидаторы

const formValidators = {};

// Кнопка редактирования профиля

const profileEditButton = document.querySelector(".profile__edit");

// Кнопка аватара

const buttonAvatar = document.querySelector("#profileImageId");

// Кнопка добавления картинки
const buttonAdd = document.querySelector(".profile__add");

//Все формы со страницы в одном месте

const formList = Array.from(
    document.querySelectorAll(selectorElements.formSelector)
);


// Попапы

// экземпляр с попапом добавления карты

const popupAddCardForm = new PopupWithForm("#add", (data) => {
    popupAddCardForm.changeSubmitButtonText("Создание...");
    api
        .addCard(data.name, data.link)
        .then((res) => {
            const card = createCard(res);
            cardList.addItemPrepend(card);
            popupAddCardForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAddCardForm.changeSubmitButtonText("Создать");
        });
});

// экземпляр попапа с бооольшой картинкой

const popupPicture = new PopupWithImage("#previewPopup");

// экземпляр с попапом формы юзера

const popupProfileForm = new PopupWithForm("#profile", (data) => {
    popupProfileForm.changeSubmitButtonText("Сохранение...");
    api
        .updateProfile(data._name, data._hobby)
        .then((res) => {
            userInfo.setUserInfo(res.name, res.about);
            userInfo.fillProfileOnPage();
            popupProfileForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupProfileForm.changeSubmitButtonText("Сохранить");
        });
});

// экземпляр с попапом обновления аватара
const popupUpdateAvatar = new PopupWithForm("#updateAvatarPopup", (data) => {
  popupUpdateAvatar.changeSubmitButtonText("Сохранение...");
  api
    .updateAvatar(data.link)
    .then((res) => {
      userInfo.updateAvatar(res.avatar);
      popupUpdateAvatar.close();
    })
    .catch((err) => {
      console.log(err);

    })
    .finally(() => {
      popupUpdateAvatar.changeSubmitButtonText("Сохранить");
    });
});

// экземпляр попапа удаления

const popupWithDeleteConfirmation = new PopupWithForm(
    "#confirmPopup",
    (event) => {
        api
            .deleteCard(currentCardForDelete.getID())
            .then(() => {
                currentCardForDelete.delete();
                popupWithDeleteConfirmation.close();
            })
            .catch((err) => {
                console.log(err);
            });
    }
);

// Включение прослушек
popupProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();
popupPicture.setEventListeners();
popupWithDeleteConfirmation.setEventListeners();
popupUpdateAvatar.setEventListeners();


function createCard(cardResp) {
    const card = new Card(
        cardResp,
        "#albumTemplate",
        handlePictureClick,
        handleLikeClick,
        handleDeleteClick,
        userInfo.getId()
        );
    const cardElement = card.createCard();
    return cardElement;
}

function handlePictureClick(name, link) {
    popupPicture.open(name, link);
}

function handleDeleteClick(card) {
    currentCardForDelete = card;
    popupWithDeleteConfirmation.open();
}

// Действая с лайками, добавление и удаление

function handleLikeClick(card) {
    if (card.isLiked()) {
        deleteLike(card);
    } else {
        addLike(card);
    }
}

function addLike(card) {
    api
        .addLike(card.getID())
        .then((res) => {
            card.setLikes(res.likes);
        })
        .catch((err) => {
            console.log(err);
        });
}

function deleteLike(card) {
    api
        .deleteLike(card.getID())
        .then((res) => {
            card.setLikes(res.likes);
        })
        .catch((err) => {
            console.log(err);
        });
}

//Добавляем прослушки на кнопки

profileEditButton.addEventListener("click", () => {
    popupProfileForm.setInputValues(userInfo.getUserInfo());
    popupProfileForm.open();
});

buttonAdd.addEventListener("click", () => {
    popupAddCardForm.open();
    console.log(formValidators)
    formValidators["popup__add-form"].resetValidation();
});

buttonAvatar.addEventListener("click", () => {
    popupUpdateAvatar.open();
});

//Получаем данные о пользователи и массив карт с бэкенда

Promise.all([api.getProfile(), api.getCards()])
    .then((res) => {
        console.log(res)

        userInfo = new UserInfo(
            res[0],
            {
                nameSelector: ".profile__name",
                hobbySelector: ".profile__hobby",
                avatarSelector: ".profile__avatar"

            });
        userInfo.fillProfileOnPage();
        userInfo.updateAvatar(res[0].avatar);
        cardList = new Section(
            {
                items: res[1],
                renderer: (card) => {
                    const cardElement = createCard(card);
                    cardList.addItemAppend(cardElement);
                },
            },
            "#albumCards"
        );
        cardList.renderer();
    })
    .catch((err) => {
        console.log(err);
    });

formList.forEach((form) => {
    const formElementValidation = new FormValidator(selectorElements, form);
    formElementValidation.enableValidation();
    const formName = form.getAttribute("name");
    formValidators[formName] = formElementValidation;
});

