"use strict"

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');
let editProfileButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button')

function openPopup() {
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');

  popup.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  nameInput.focus();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', openPopup)
closePopupButton.addEventListener('click', closePopup)

function handleFormSubmit(evt) {
  evt.preventDefault();

  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);