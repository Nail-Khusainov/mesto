import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitHandler, defaultSubmitButtonText) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._submitForm = this._popup.querySelector('.popup__form');
        this._defaultSubmitButtonText = defaultSubmitButtonText;
    }

    //дополнительно присваиваем свойству класса передаваемые значения
    open(card) {
        super.open();
        this.card = card;
        this.resetButtonLoadingText()
    }

    //получаем кнопку сабмита
    _getSubmitButton() {
        return this._popup.querySelector(".popup__submit-button");
    }

    setButtonLoadingText() {
        this._getSubmitButton().textContent = "Удаление...";
    }

    resetButtonLoadingText() {
        this._getSubmitButton().textContent = this._defaultSubmitButtonText;
    }

    setEventListeners() {
        super.setEventListeners();

        this._submitForm.addEventListener('submit', () => {
            this._submitHandler(this.card);
            this.setButtonLoadingText();
            this.close();
        });
    }
}