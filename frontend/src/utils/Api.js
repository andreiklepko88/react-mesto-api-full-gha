import { httpMethods } from '../constants/constants';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  };

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: httpMethods.get,
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._handleResponse);
  }


  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: httpMethods.get,
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._handleResponse);
  };


  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: httpMethods.post,
      headers: this._headers,
      body: JSON.stringify({ name, link }),
      credentials: 'include',
    })
      .then(this._handleResponse);
  };

  changeAvatar({ link }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: httpMethods.patch,
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      }),
      credentials: 'include',
    })
      .then(this._handleResponse);
  };

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: httpMethods.put,
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._handleResponse);
  };

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: httpMethods.delete,
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._handleResponse);
  };

  changeLikeCardStatus(id, isLiked) {
    return isLiked ?
      this.addLike(id) : this.removeLike(id)
  }

  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: httpMethods.patch,
      headers: this._headers,
      body: JSON.stringify({ name, about }),
      credentials: 'include',
    })
      .then(this._handleResponse);
  };

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: httpMethods.delete,
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._handleResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://api.mestoproject-klepkoas.nomoredomains.xyz',
  headers: {
    "Content-Type": "application/json"
  }
})
