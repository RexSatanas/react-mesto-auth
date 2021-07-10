class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _getResponseData = (res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`ERROR: ${res.status}`)
    }

    getUser() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(this._getResponseData)

    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this._getResponseData)
    }

    updateUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.status
            })
        })
            .then(this._getResponseData)
    }

    saveNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._getResponseData)
    }

    newAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._getResponseData)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponseData)
    }


    likeCard(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._getResponseData)
    }


    likeCardCancel(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponseData)
    }

    changeLikeCardStatus(id, isLiked) {
        if (!isLiked) {
            return this.likeCardCancel(id)
        } else {
            return this.likeCard(id)
        }
    }
}

    const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: 'be87e10d-5f50-49e4-a06f-5cefb6b5b607',
        'Content-Type': 'application/json'
    }
});
export default api