// Создание карточки с прослушками

export class Card {
  constructor(name, link, templateSelector, handlePictureClick) {
    this._name = name;
    this._link = link;
    this._tamplateSelector = templateSelector;
    this._handlePictureClick = handlePictureClick;
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

  createCard() {
    this._cardElement = this._generateCardTemplate();
    this._image = this._cardElement.querySelector(".album__foto");
    this._image.alt = this._name;
    this._image.src = this._link;
    this._cardElement.querySelector(".album__text").textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".album__like")
      .addEventListener("click", (event) => {
    this._toggleLike(event);
      });

      
    this._cardElement
      .querySelector(".album__delete")
      .addEventListener("click", (event) => {
        this._deleteCard(event);
      });

    this._handleImageClick();
  }
    _toggleLike(event) {
        const className = "album__like_active";
        const classList = event.target.classList;
        classList.toggle(className);
    }
    
    
    _deleteCard(event){
        event.target.closest(".album__element").remove();
    }
    
    _handleImageClick(){
        this._image.addEventListener("click", (event) => {
            this._handlePictureClick(this._name, this._link);
          });
    }
}
