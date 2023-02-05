let formElements = document.querySelectorAll('.popup__form');
let nameInput = document.querySelector('.popup__field_profile_name');
let jobInput = document.querySelector('.popup__field_profile_job');
let titleInput = document.querySelector('.popup__field_card_title');
let linkInput = document.querySelector('.popup__field_card_link');
let editProfileButton = document.querySelector('.profile__edit-button');
let addCardButton = document.querySelector('.profile__add-button');
let popupEditProfile = document.querySelector('.popup__profile-edit');
let popupAddCard = document.querySelector('.popup__add-card');
let popupImage = document.querySelector('.popup_image');
let closePopupButtons = document.querySelectorAll('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let sectionElements = document.querySelector('.elements');
let templateCard = document.querySelector('.template-card').content.querySelector('.element');

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

function renderCards(items) {
  const cards = items.map((item) => {
    return createCard(item)
  })

  sectionElements.append(...cards);
}

function createCard(item) {
  const card = templateCard.cloneNode(true);
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__image').src = item.link;

  card.querySelector('.element__like-button').addEventListener("click", putAlike);
  card.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.element__image').addEventListener('click', openPopup)

  return card;
}

function putAlike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

function openPopup(evt) {
  if (evt.target === editProfileButton) {
    popupEditProfile.classList.add('popup_opened');

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }

  if (evt.target === addCardButton) {
    popupAddCard.classList.add('popup_opened');
  }

  if (evt.target.classList.contains('element__image')) {
    popupImage.classList.add('popup_opened');

    popupImage.querySelector('.popup__image').src = evt.target.src;
    popupImage.querySelector('.popup__figcaption').textContent = evt.target.parentNode.querySelector('.element__title').textContent;
  }
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  if(evt.target.closest('.popup').classList.contains('popup__profile-edit')) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  }

  if(evt.target.closest('.popup').classList.contains('popup__add-card')) {
    sectionElements.append(createCard({name: titleInput.value, link: linkInput.value}));
  }

  closePopup(evt);
}

renderCards(initialCards);

editProfileButton.addEventListener('click', openPopup);
addCardButton.addEventListener('click', openPopup);
closePopupButtons.forEach((element) => {
  element.addEventListener('click', closePopup);
});
formElements.forEach((form) => {
  form.addEventListener('submit', handleFormSubmit);
})
