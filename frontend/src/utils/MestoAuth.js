import { httpMethods } from '../constants/constants';

class MestoApi {
    constructor(args) {
        this._baseUrl = args.baseUrl;
        this._headers = args.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    };

    register(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: httpMethods.post,
            headers: this._headers,
            body: JSON.stringify({
                password,
                email
            }),
            credentials: 'include',
        })
            .then(this._handleResponse)
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: httpMethods.post,
            headers: this._headers,
            body: JSON.stringify({
                password,
                email
            }),
            credentials: 'include',
        })
            .then(this._handleResponse)
    }

    checkToken() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: httpMethods.get,
            headers: {
                ...this._headers
            },
            credentials: 'include',
        })
            .then(this._handleResponse)
    }

    logOut() {
        return fetch(`${this._baseUrl}/users/logout`, {
            method: httpMethods.delete,
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._handleResponse)
    }
}


export const mestoApi = new MestoApi({
    baseUrl: 'https://api.mestoproject-klepkoas.nomoredomains.xyz',
    headers: { 'Content-Type': 'application/json' }
})