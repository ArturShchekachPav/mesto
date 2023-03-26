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
  userInfo.setUserInfo({profileName: inputValues[0], profileDescription: inputValues[1]})
});

popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add-card', (inputValues) => {
  cardsSection.addItem(createCard({name: inputValues[0], link: inputValues[1]}));
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

  popupEditProfile.inputList[0].value = profileName;
  popupEditProfile.inputList[1].value = profileDescription;

  profileValidation.resetValidation();

  popupEditProfile.open();
});

addCardButton.addEventListener('click', () => {
  newCardValidation.resetValidation();
  popupAddCard.open();
});