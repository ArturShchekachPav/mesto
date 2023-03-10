export default class Card {
  constructor({name, link}, openImagePopup, cardConfig) {
    this._name = name;
    this._link = link;
    this._openImage = openImagePopup;
    this._cardConfig = cardConfig;
  }

  _getTemplate() {
    return document.querySelector(this._cardConfig.cardTemplateSelector).content.querySelector('.element').cloneNode(true);
  }

  _toggleLike() {
    this._cardLikeButton.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._cardDeleteButton.closest('.element').remove();
  }

  _setEventListeners() {
    this._cardLikeButton = this._card.querySelector(this._cardConfig.likeButtonSelector);
    this._cardLikeButton.addEventListener('click', () => this._toggleLike());

    this._cardDeleteButton = this._card.querySelector(this._cardConfig.deleteButtonSelector);
    this._cardDeleteButton.addEventListener('click', () => this._deleteCard());

    this._cardImage.addEventListener('click', () => {
      this._openImage(this._link, this._name);
    })
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(this._cardConfig.cardImageSelector);

    this._card.querySelector(this._cardConfig.cardTitleSelector).textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `${this._name} (фотография)`;

    this._setEventListeners();

    return this._card;
  }
}