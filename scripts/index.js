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

function toggleLike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

function fillImagePopup({src, alt}, name) {
  popupImageElement.src = src;
  popupImageElement.alt = alt;
  popupImage.querySelector('.popup__figcaption').textContent = name;
}

function createCard({name, link}, {cardImageSelector, cardTitleSelector, likeButtonSelector, deleteButtonSelector}) {
  const card = templateCard.cloneNode(true);
  const cardImage = card.querySelector(cardImageSelector);

  card.querySelector(cardTitleSelector).textContent = name;
  cardImage.src = link;
  cardImage.alt = `${name} (фотография)`;

  card.querySelector(likeButtonSelector).addEventListener('click', toggleLike);
  card.querySelector(deleteButtonSelector).addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => {
    fillImagePopup(cardImage, name);
    openPopup(popupImage);
  })

  return card;
}

function renderInitialCards(items) {
  const cards = items.map((item) => {
    return createCard(item, cardConfig)
  })

  sectionElements.append(...cards);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', catchEscape);
  popup.removeEventListener('mousedown', catchClosingClicks);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
}

function fillProfilePopup({nameInput, jobInput}, {profileJob, profileName}) {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
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
  handleFormSubmit(evt);

  updateProfileData(evt.currentTarget, profileData);
  closePopup(popupEditProfile);
})

formAddCard.addEventListener('submit', (evt) => {
  handleFormSubmit(evt);

  const {titleInput, linkInput} = evt.currentTarget;

  closePopup(popupAddCard);

  sectionElements.prepend(createCard({name: titleInput.value, link: linkInput.value}, cardConfig));
  evt.target.reset();
});

enableValidation(formConfig);