// Создание карточки с прослушками

export class Card {
    constructor({name, link, likes, _id, owner},
                templateSelector,
                handlePictureClick,
                handleLikeClick,
                handleDeleteClick,
                userID) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._id = _id;
        this._ownerID = owner._id;
        this._userID = userID;
        this._tamplateSelector = templateSelector;
        this._handlePictureClick = handlePictureClick;
        this._cardElement = null;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    }

    _generateCardTemplate() {
        const templateElement = document.querySelector(
            this._tamplateSelector
        ).content;
        const card = templateElement
            .querySelector(".album__element")
            .cloneNode(true);
        return card;
    }

    _setLikeState() {
        if (this.isLiked()) {
            this._albumLikeElement.classList.add("album__like_active");
        } else {
            this._albumLikeElement.classList.remove("album__like_active");
        }
    }

    _setEventListeners() {
        this._handleLikeAction()
        this._handleDeleteAction()
        this._handleImageClick();
    }

    _handleLikeAction() {
        this._albumLikeElement.addEventListener("click", (event) => {
            this._handleLikeClick(this);
        });
    }

    _handleDeleteAction() {
        this._buttonDelete.addEventListener("click", () => {
            this._handleDeleteClick(this);
        });
    }

    _handleImageClick() {
        this._image.addEventListener("click", (event) => {
            this._handlePictureClick(this._name, this._link);
        });
    }


    createCard() {
        this._cardElement = this._generateCardTemplate();
        this._cardElement.querySelector(".album__text").textContent = this._name;

        // манипуляции с картинкой
        this._image = this._cardElement.querySelector(".album__foto");
        this._image.alt = this._name;
        this._image.src = this._link;

        // манипуляции с лайком и его счетчиком
        this._albumLikeElement = this._cardElement.querySelector(".album__like");
        this._likesScore = this._cardElement.querySelector(".album__counter-like");
        this._likesScore.innerText = this._likes.length;

        // манипуляции с иконкой удаления
        this._buttonDelete = this._cardElement.querySelector(".album__delete");
        if (this._ownerID !== this._userID) {
            this._buttonDelete.classList.add("elements__delete_hidden");
        }

        this._setLikeState();
        this._setEventListeners();
        return this._cardElement;
    }

    setLikes(likes) {
        this._likes = likes;
        this._likesScore.innerText = this._likes.length;
        this._setLikeState();
    }

    // была ли картинку лайкнута именно нами
    isLiked() {
        return this._likes.some((element) => element._id === this._userID);
    }

    getID() {
        return this._id;
    }

    delete() {
        this._cardElement.remove();
        this._cardElement = null;
    }
}
