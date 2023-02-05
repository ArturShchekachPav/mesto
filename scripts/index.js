let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__field_profile_name');
let jobInput = document.querySelector('.popup__field_profile_job');
let editProfileButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button')
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

  sectionElements.append(...cards)
}

function createCard(item) {
  const card = templateCard.cloneNode(true);
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__image').src = item.link;

  card.querySelector('.element__like-button').addEventListener("click", putAlike);
  card.querySelector('.element__delete-button').addEventListener('click', deleteCard);

  return card;
}

function putAlike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

function openPopup() {
  popup.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

renderCards(initialCards);

editProfileButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);