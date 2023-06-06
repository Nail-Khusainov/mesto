export default class UserInfo {
    constructor({
        userNameSelector, userAboutSelector, userAvatarSelector }) {
        this._userNameSelector = userNameSelector;
        this._userAboutSelector = userAboutSelector;
        this._userAvatarSelector = userAvatarSelector;
        this._userName = document.querySelector(this._userNameSelector);
        this._userAbout = document.querySelector(this._userAboutSelector);
        this._userAvatar = document.querySelector(this._userAvatarSelector)
    }

    getUserInfo() {
        return {
            user_name: this._userName.textContent,
            user_about: this._userAbout.textContent,
        }
    }

    setUserInfo({ userNameInput, userAboutInput, userId }) {
        this._userName.textContent = userNameInput;
        this._userAbout.textContent = userAboutInput;
        this.id = userId;
    }

    setAvatar( { userAvatar }) {
        this._userAvatar.src = userAvatar;
    }

    getUserId() {
        return this.id;
    }
}