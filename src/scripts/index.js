import '../pages/index.css';

import Card from './Card.js';
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const cardConfig = {
  likeButtonSelector: '.element__like-button',
  deleteButtonSelector: '.element__delete-button',
  cardImageSelector: '.element__image',
  cardSelector: '.element',
  cardTitleSelector: '.element__title',
  cardTemplateSelector: '.template-card'
}

const profileData = {
  profileName: document.querySelector('.profile__name'),
  profileJob: document.querySelector('.profile__job')
}

const formEditProfile = document.forms.editProfileForm;
const formAddCard = document.forms.addCardForm;

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_profile-edit');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const sectionElements = document.querySelector('.elements');

const profileValidation = new FormValidator(formConfig, formEditProfile);
const newCardValidation = new FormValidator(formConfig, formAddCard);

profileValidation.enableValidation();
newCardValidation.enableValidation();


function catchEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(evt.currentTarget.querySelector('.popup_opened'));
  }
}

function catchClosingClicks(evt) {
  if (evt.currentTarget === evt.target || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
}

function openPopup(popup) {
  document.addEventListener('keydown', catchEscape);

  popup.classList.add('popup_opened');
}

function createCard(data) {
  const card = new Card(data, openImagePopup, cardConfig);
  return card.createCard();
}

function renderInitialCards(items) {
  const cards = items.map((item) => {
    return createCard(item);
  })

  sectionElements.append(...cards);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', catchEscape);
}

function fillProfilePopup({nameInput, jobInput}, {profileJob, profileName}) {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}

function updateProfileData({nameInput, jobInput}, {profileJob, profileName}) {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function openImagePopup(link, name) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupImage.querySelector('.popup__figcaption').textContent = name;

  openPopup(popupImage);
}

renderInitialCards(initialCards);

document.querySelectorAll('.popup').forEach( popup => {
  popup.addEventListener('mousedown', catchClosingClicks);
});

fillProfilePopup(formEditProfile, profileData);

editProfileButton.addEventListener('click', () => {
  fillProfilePopup(formEditProfile, profileData);
  profileValidation.resetValidation();
  openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', () => {
  newCardValidation.resetValidation();
  openPopup(popupAddCard);
});

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  updateProfileData(evt.currentTarget, profileData);
  closePopup(popupEditProfile);
})

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const {titleInput, linkInput} = evt.currentTarget;

  closePopup(popupAddCard);

  sectionElements.prepend(createCard({name: titleInput.value, link: linkInput.value}));
  evt.target.reset();
});