import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(popupSelector,
		formSubmit
	) {
		super(popupSelector);
		this._formSubmit = formSubmit;
		this.form = this._popup.querySelector('.popup__form');
		this.button = this.form.querySelector('.popup__button');
		this.defaultButtonText = this.button.textContent;
		this._inputList = this.form.querySelectorAll('.popup__input');
	}
	
	_getInputValues() {
		this._formValues = {};
		
		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
		
		return this._formValues;
	}
	
	
	setInputValues(data) {
		this._inputList.forEach((input) => {
			input.value = data[input.name];
		});
	}
	
	_renderLoading(isLoading) {
		if (isLoading) {
			this.button.textContent = 'Сохранение...';
		} else {
			this.button.textContent = this.defaultButtonText;
		}
	}
	
	setEventListeners() {
		super.setEventListeners();
		
		this.form.addEventListener('submit',
			(evt) => {
				evt.preventDefault();
				
				this._renderLoading(true);
				
				this._formSubmit(this._getInputValues(),
					this._renderLoading,
					this.button
				)
					.then(() => {
						this.close();
					})
					.catch(err => {
						console.log(err);
					})
					.finally(() => {
						this._renderLoading(false);
					});
			}
		);
	}
	
	close() {
		super.close();
		
		this.form.reset();
	}
}