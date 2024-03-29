export default class Api {
	constructor({
		baseUrl,
		headers
	}) {
		this.baseUrl = baseUrl;
		this.headers = headers;
	}
	
	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	
	getInitialCards() {
		return fetch(`${this.baseUrl}/cards`,
			{
				method: 'GET',
				headers: this.headers
			}
		)
			.then(this._checkResponse);
	}
	
	getProfileData() {
		return fetch(`${this.baseUrl}/users/me`,
			{
				method: 'GET',
				headers: this.headers
			}
		)
			.then(this._checkResponse);
	}
	
	editProfileData(name,
		about
	) {
		return fetch(`${this.baseUrl}/users/me`,
			{
				method: 'PATCH',
				headers: this.headers,
				body: JSON.stringify({
					name: name,
					about: about
				})
			}
		)
			.then(this._checkResponse);
	}
	
	postNewCard(name,
		link
	) {
		return fetch(`${this.baseUrl}/cards`,
			{
				method: 'POST',
				headers: this.headers,
				body: JSON.stringify({
					name: name,
					link: link
				})
			}
		)
			.then(this._checkResponse);
	}
	
	deleteCard(cardId) {
		return fetch(`${this.baseUrl}/cards/${cardId}`,
			{
				method: 'DELETE',
				headers: this.headers
			}
		)
			.then(this._checkResponse);
	}
	
	addCardLike(cardId) {
		return fetch(`${this.baseUrl}/cards/${cardId}/likes`,
			{
				method: 'PUT',
				headers: this.headers
			}
		)
			.then(this._checkResponse);
	}
	
	removeCardLike(cardId) {
		return fetch(`${this.baseUrl}/cards/${cardId}/likes`,
			{
				method: 'DELETE',
				headers: this.headers
			}
		)
			.then(this._checkResponse);
	}
	
	editAvatar(link) {
		return fetch(`${this.baseUrl}/users/me/avatar`,
			{
				method: 'PATCH',
				headers: this.headers,
				body: JSON.stringify({
					avatar: link
				})
			}
		)
			.then(this._checkResponse);
	}
}