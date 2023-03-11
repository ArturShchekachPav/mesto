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
const formList = Array.from(document.querySelectorAll(formConfig.formSelector));
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_profile-edit');
const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupImage = document.querySelector('.popup_type_image');
export const popupImageElement = popupImage.querySelector('.popup__image');
const sectionElements = document.querySelector('.elements');


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
  popup.addEventListener('mousedown', catchClosingClicks);

  popup.classList.add('popup_opened');
}

function renderInitialCards(items) {
  const cards = items.map((item) => {
    const card = new Card(item, openPopup, cardConfig);
    return card.createCard();
  })

  sectionElements.append(...cards);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', catchEscape);
  popup.removeEventListener('mousedown', catchClosingClicks);
}

function fillProfilePopup({nameInput, jobInput}, {profileJob, profileName}) {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;

  const inputEvent = new InputEvent('input', {
    bubbles: true,
    cancelable: true,
  });

  jobInput.dispatchEvent(inputEvent);
  nameInput.dispatchEvent(inputEvent);
}

function updateProfileData({nameInput, jobInput}, {profileJob, profileName}) {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

renderInitialCards(initialCards);

fillProfilePopup(formEditProfile, profileData);

editProfileButton.addEventListener('click', () => {
  fillProfilePopup(formEditProfile, profileData);
  openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', () => openPopup(popupAddCard));

formEditProfile.addEventListener('submit', (evt) => {
  updateProfileData(evt.currentTarget, profileData);
  closePopup(popupEditProfile);
})

formAddCard.addEventListener('submit', (evt) => {
  const {titleInput, linkInput} = evt.currentTarget;

  closePopup(popupAddCard);

  const card = new Card({name: titleInput.value, link: linkInput.value}, openPopup, cardConfig);

  sectionElements.prepend(card.createCard());
  evt.target.reset();
});

formList.forEach(formElement => {
  const formValidator = new FormValidator(formConfig, formElement);

  formValidator.enableValidation();
});