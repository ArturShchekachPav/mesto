export default class Card {
	constructor({
			name,
			link,
			likes,
			_id
		},
		handleCardClick,
		cardConfig,
		api,
		{profileId}
	) {
		this._id = _id;
		this._name = name;
		this._link = link;
		this._openImage = handleCardClick;
		this._cardConfig = cardConfig;
		this._likes = likes;
		this._likeStatus = false;
		this._api = api;
		this._profileId = profileId;
		this._card = this._getTemplate();
		this._cardImage = this._card.querySelector(this._cardConfig.cardImageSelector);
		this._likeCounter = this._card.querySelector(this._cardConfig.cardLikeCounterSelector);
		this._cardLikeButton = this._card.querySelector(this._cardConfig.likeButtonSelector);
	}
	
	_getTemplate() {
		return document.querySelector(this._cardConfig.cardTemplateSelector)
			.content
			.querySelector('.element')
			.cloneNode(
				true);
	}
	
	_checkLikeStatus(likes) {
		return likes.some(like => like._id === this._profileId);
	}
	
	_setLikeStatus() {
		if (this._checkLikeStatus(this._likes)) {
			this._setLikeActive();
		}
	}
	
	_toggleLikeStatus() {
		if (this._likeStatus) {
			this._unlikeCard();
		} else {
			this._likeCard();
		}
	}
	
	_setLikeActive() {
		this._cardLikeButton.classList.add('element__like-button_active');
		this._likeStatus = !this._likeStatus;
	}
	
	_setLikeInactive() {
		this._cardLikeButton.classList.remove('element__like-button_active');
		this._likeStatus = !this._likeStatus;
	}
	
	_likeCard() {
		this._api.addCardLike(this._id)
			.then(res => {
				if (this._checkLikeStatus(res.likes)) {
					this._setLikeActive();
					this._likeCounter.textContent = res.likes.length;
				}
			});
	}
	
	_unlikeCard() {
		this._api.removeCardLike(this._id)
			.then(res => {
				if (!this._checkLikeStatus(res.likes)) {
					this._setLikeInactive();
					this._likeCounter.textContent = res.likes.length;
				}
			});
	}
	
	_setEventListeners() {
		this._cardLikeButton.addEventListener('click',
			() => this._toggleLikeStatus()
		);
		
		this._cardImage.addEventListener('click',
			() => {
				this._openImage(this._link,
					this._name
				);
			}
		);
	}
	
	createCard() {
		this._card.querySelector(this._cardConfig.cardTitleSelector).textContent = this._name;
		this._cardImage.src = this._link;
		this._cardImage.alt = `${this._name} (фотография)`;
		this._likeCounter.textContent = this._likes.length;
		
		this._setEventListeners();
		this._setLikeStatus();
		
		return this._card;
	}
}