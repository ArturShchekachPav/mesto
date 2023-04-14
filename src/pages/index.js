import './index.css';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
	addCardButton,
	editProfileButton,
	editAvatarButton,
	formConfig
} from '../utils/constants.js';
import {createCard} from '../utils/utils.js';
import PopupWithConfirm from '../components/PopupWithConfirm';

export const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
	headers: {
		authorization: '732768ad-79ae-4275-8a66-3acc0ba2d814',
		'Content-Type': 'application/json'
	}
});

const cardsSection = new Section(
	(item) => {return createCard(item);},
	'.elements'
);

export const userInfo = new UserInfo('.profile__name',
	'.profile__job',
	'.profile__avatar'
);

Promise.all([api.getInitialCards(),
	api.getProfileData()
])
	.then(([cards, {
		about,
		avatar,
		name,
		_id
	}
	]) => {
		userInfo.setUserInfo({
			nameInput: name,
			jobInput: about
		});
		userInfo.getUserID(_id);
		userInfo.setUserAvatar(avatar);
		
		cardsSection.renderItems(cards);
	})
	.catch(err => {
		console.log(err);
	});

const popupEditProfile = new PopupWithForm('.popup_type_profile-edit',
	(inputValues) => {
		const {
			nameInput,
			jobInput
		} = inputValues;
		return api.editProfileData(nameInput,
			jobInput
		)
			.then(({
				name,
				about
			}) => {
				userInfo.setUserInfo({
					nameInput: name,
					jobInput: about
				});
			});
	}
);

const popupAddCard = new PopupWithForm('.popup_type_add-card',
	({
		titleInput,
		linkInput
	}) => {
		return api.postNewCard(titleInput,
			linkInput
		)
			.then(res => {
				cardsSection.addItem(createCard(res));
			});
	}
);

export const popupWithImage = new PopupWithImage('.popup_type_image');

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar',
	({avatarLinkInput}) => {
		return api.editAvatar(avatarLinkInput)
			.then(({avatar}) => {
				userInfo.setUserAvatar(avatar);
			});
	}
);

export const popupConfimation = new PopupWithConfirm('.popup_type_delete-card',
	(card) => {
		return api.deleteCard(card._id)
			.then(() => {
				card.deleteCard();
			});
	}
);

popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupConfimation.setEventListeners();

const profileValidation = new FormValidator(formConfig,
	popupEditProfile.form
);
const newCardValidation = new FormValidator(formConfig,
	popupAddCard.form
);

const editAvatarValidation = new FormValidator(formConfig,
	popupEditAvatar.form
);

profileValidation.enableValidation();
newCardValidation.enableValidation();
editAvatarValidation.enableValidation();

editProfileButton.addEventListener('click',
	() => {
		const {
			profileName,
			profileDescription
		} = userInfo.getUserInfo();
		
		// popupEditProfile.form.nameInput.value = profileName;
		// popupEditProfile.form.jobInput.value = profileDescription;
		popupEditProfile.setInputValues({nameInput: profileName, jobInput: profileDescription})
		
		profileValidation.resetValidation();
		
		popupEditProfile.open();
	}
);

addCardButton.addEventListener('click',
	() => {
		newCardValidation.resetValidation();
		popupAddCard.open();
	}
);

editAvatarButton.addEventListener('click',
	() => {
	editAvatarValidation.resetValidation();
	popupEditAvatar.open()
}
);