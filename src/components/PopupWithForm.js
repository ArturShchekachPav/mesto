import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    return this.inputList.map(input => {
      return input.value;
    })
  }

  setEventListeners() {
    super.setEventListeners();

    this.form = this._popup.querySelector('.popup__form');
    this.inputList = Array.from(this.form.querySelectorAll('.popup__input'));

    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._formSubmit(this._getInputValues());

      this.close();
    });
  }

  close() {
    super.close();

    this.form.reset();
  }
}