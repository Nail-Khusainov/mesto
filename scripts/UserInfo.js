export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector }) {
        this._userNameSelector = userNameSelector;
        this._userAboutSelector = userAboutSelector;
        this._userName = document.querySelector(this._userNameSelector);
        this._userAbout = document.querySelector(this._userAboutSelector);

    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userAbout: this._userAbout.textContent,
        }
    }

    setUserInfo({ userNameInput, userAboutInput}) {
        this._userName.textContent = userNameInput;
        this._userAbout.textContent = userAboutInput;
    }
}