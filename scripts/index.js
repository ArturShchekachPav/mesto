const formEditProfile = document.querySelector('.popup__form_edit-profile');
const formAddCard = document.querySelector('.popup__form_add-card');
const nameInput = document.querySelector('.popup__field_profile_name');
const jobInput = document.querySelector('.popup__field_profile_job');
const titleInput = document.querySelector('.popup__field_card_title');
const linkInput = document.querySelector('.popup__field_card_link');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_profile-edit');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const sectionElements = document.querySelector('.elements');
const templateCard = document.querySelector('.template-card').content.querySelector('.element');

function putAlike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

function  openPopup(popup) {
  popup.classList.add('popup_opened');
}

function createCard(item) {
  const card = templateCard.cloneNode(true);
  const cardImage = card.querySelector('.element__image');

  card.querySelector('.element__title').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = `${item.name} (фотография)`;

  card.querySelector('.element__like-button').addEventListener("click", putAlike);
  card.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => {
    popupImageElement.src = cardImage.src;
    popupImageElement.alt = cardImage.alt;
    popupImage.querySelector('.popup__figcaption').textContent = item.name;
    openPopup(popupImage);
  })

  return card;
}

function renderInitialCards(items) {
  const cards = items.map((item) => {
    return createCard(item)
  })

  sectionElements.append(...cards);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
}

renderInitialCards(initialCards);

editProfileButton.addEventListener('click', () => {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;

  openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', () => openPopup(popupAddCard));
closePopupButtons.forEach((closePopupButtons) => {
  closePopupButtons.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

formEditProfile.addEventListener('submit', (evt) => {
  handleFormSubmit(evt);

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
})

formAddCard.addEventListener('submit', (evt) => {
  handleFormSubmit(evt);

  closePopup(popupAddCard);

  sectionElements.prepend(createCard({name: titleInput.value, link: linkInput.value}));
  evt.target.reset();
})
