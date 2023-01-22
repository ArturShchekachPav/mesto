let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__field_profile_name');
let jobInput = document.querySelector('.popup__field_profile_job');
let editProfileButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button')
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let likeButtons = document.querySelectorAll('.element__like-button');

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

// function changeLikeStatus() {
//   likeButton.classList.toggle('element__like-button_active')
// }

editProfileButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
likeButtons.forEach(likeButton => {
  likeButton.addEventListener("click", () => likeButton.classList.toggle('element__like-button_active'));
});