import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._submitForm = this._popup.querySelector('.popup__form');
        this._submitButtonText = this._submitButton.textContent
    }

    //дополнительно присваиваем свойству класса передаваемые значения
    open(card) {
        super.open();
        this.card = card;
    }

    renderLoading(isLoading, loadingText = 'Удаление...') {
        if (isLoading) {
            this._submitButton.textContent = loadingText;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    setEventListeners() {
        super.setEventListeners();


        this._submitForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitHandler(this.card);
        });
    }
}