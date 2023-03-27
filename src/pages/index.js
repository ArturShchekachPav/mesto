import './index.css';

import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {addCardButton, editProfileButton, formConfig, initialCards} from "../utils/constants.js"
import {createCard} from "../utils/utils.js";

const cardsSection = new Section({
  items: initialCards, renderer: (item) => {
    return createCard(item);
  }
}, '.elements');

cardsSection.renderItems();

const userInfo = new UserInfo('.profile__name', '.profile__job');

const popupEditProfile = new PopupWithForm('.popup_type_profile-edit', (inputValues) => {
  userInfo.setUserInfo(inputValues);
});

popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add-card', ({titleInput, linkInput}) => {
  cardsSection.addItem(createCard({name: titleInput, link: linkInput}));
})

popupAddCard.setEventListeners();

export const popupWithImage = new PopupWithImage('.popup_type_image')

popupWithImage.setEventListeners();

const profileValidation = new FormValidator(formConfig, popupEditProfile.form);
const newCardValidation = new FormValidator(formConfig, popupAddCard.form);

profileValidation.enableValidation();
newCardValidation.enableValidation();

editProfileButton.addEventListener('click', () => {
  const {profileName, profileDescription} = userInfo.getUserInfo();

  popupEditProfile.form.nameInput.value = profileName;
  popupEditProfile.form.jobInput.value = profileDescription;

  profileValidation.resetValidation();

  popupEditProfile.open();
});

addCardButton.addEventListener('click', () => {
  newCardValidation.resetValidation();
  popupAddCard.open();
});