import {popupImage, popupImageElement} from "./index.js";

export default class Card {
  constructor({name, link}, templateSelector, openPopup) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = openPopup;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }

  _fillImagePopup() {
    popupImageElement.src = this._link;
    popupImageElement.alt = this._name;
    popupImage.querySelector('.popup__figcaption').textContent = this._name;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  _deleteCard(evt) {
    evt.target.closest('.element').remove();
  }

  _setEventListeners(card, cardImage, likeButtonSelector, deleteButtonSelector) {
    card.querySelector(likeButtonSelector).addEventListener('click', (evt) => this._toggleLike(evt));
    card.querySelector(deleteButtonSelector).addEventListener('click', (evt) => this._deleteCard(evt));
    cardImage.addEventListener('click', () => {
      this._fillImagePopup();
      this._handleOpenPopup(popupImage);
    })
  }

  createCard({cardImageSelector, cardTitleSelector, likeButtonSelector, deleteButtonSelector}) {
    const card = this._getTemplate();
    const cardImage = card.querySelector(cardImageSelector);

    card.querySelector(cardTitleSelector).textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = `${this._name} (фотография)`;

    this._setEventListeners(card, cardImage, likeButtonSelector, deleteButtonSelector);

    return card;
  }
}