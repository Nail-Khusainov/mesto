// import { esc } from './constants';

const esc = 'Escape';

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupOpened = 'popup_opened';
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add(this._popupOpened);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove(this._popupOpened);
        document.removeEventListener('keydown', this._handleEscClose);
    };

    _popupCloseOverlayHandler = (evt) => {
        if (evt.target.classList.contains(this._popupOpened)) {
            this.close();
        }
    }

    _handleEscClose = (evt) => {
        if (evt.key === esc) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', this._popupCloseOverlayHandler)
    }
}