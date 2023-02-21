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
  formSelector        : '.popup__form',
  inputSelector       : '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass : 'popup__button_disabled',
  inputErrorClass     : 'popup__input_type_error',
  errorClass          : 'popup__error_visible'
}

const cardConfig = {
  likeButtonSelector  : '.element__like-button',
  deleteButtonSelector: '.element__delete-button',
  cardImageSelector: '.element__image',
  cardSelector     : '.element',
  cardTitleSelector: '.element__title'
}

const profileData = {
  profileName: document.querySelector('.profile__name'),
  profileJob : document.querySelector('.profile__job')
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
const templateCard = document.querySelector('.template-card').content.querySelector('.element');