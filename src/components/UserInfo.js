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

    setUserInfo({ name, about, avatar, _id }) {
        this._userName.textContent = name;
        this._userAbout.textContent = about;
        this._avatar = avatar;
        this.userId = _id;
    }

    setAvatar({ avatar }) {
        this._userAvatar.src = avatar;
    }

    // getUserId() {
    //     return this.id;
    // }
}