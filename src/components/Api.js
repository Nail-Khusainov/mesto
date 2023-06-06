export class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    //обработчик ответа сервера
    _handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`ERROR: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then(this._handleResponse);
    }

    getUserInfoFromServer() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then(this._handleResponse);
    }

    setNewUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.user_name,
                about: data.user_about,
            }),
        }).then(this._handleResponse);
    }

    setAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.user_avatar,
            }),
        }).then(this._handleResponse);
    }

    setCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            }),
        }).then(this._handleResponse);
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._handleResponse);
    }

    addLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._handleResponse);
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._handleResponse);
    }
}

