const formElements = document.querySelectorAll('.popup__form');
const nameInput = document.querySelector('.popup__field_profile_name');
const jobInput = document.querySelector('.popup__field_profile_job');
const titleInput = document.querySelector('.popup__field_card_title');
const linkInput = document.querySelector('.popup__field_card_link');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup__profile-edit');
const popupAddCard = document.querySelector('.popup__add-card');
const popupImage = document.querySelector('.popup_image');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const sectionElements = document.querySelector('.elements');
const templateCard = document.querySelector('.template-card').content.querySelector('.element');

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

function putAlike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

function openEditProfilePopup() {
  popupEditProfile.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openAddCardPopup() {
  popupAddCard.classList.add('popup_opened');
}

function openImagePopup(evt) {
  popupImage.classList.add('popup_opened');

  popupImage.querySelector('.popup__image').src = evt.target.src;
  popupImage.querySelector('.popup__figcaption').textContent = evt.target.parentNode.querySelector('.element__title').textContent;
}

function openPopup(evt) {
  if (evt.target === editProfileButton) {
    openEditProfilePopup();
  }

  if (evt.target === addCardButton) {
    openAddCardPopup();
  }

  if (evt.target.classList.contains('element__image')) {
    openImagePopup(evt);
  }
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

function renderCards(items) {
  const cards = items.map((item) => {
    return createCard(item)
  })

  sectionElements.append(...cards);
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function updateProfile() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function addNewCard() {
  sectionElements.prepend(createCard({name: titleInput.value, link: linkInput.value}));
  titleInput.value = '';
  linkInput.value = '';
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  if (evt.target.closest('.popup').classList.contains('popup__profile-edit')) {
    updateProfile();
  }

  if (evt.target.closest('.popup').classList.contains('popup__add-card')) {
    addNewCard();
  }

  closePopup(evt);
}

renderCards(initialCards);

editProfileButton.addEventListener('click', openPopup);
addCardButton.addEventListener('click', openPopup);
closePopupButtons.forEach((closePopupButtons) => {
  closePopupButtons.addEventListener('click', closePopup);
});
formElements.forEach((form) => {
  form.addEventListener('submit', handleFormSubmit);
})
