import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler, defaultSubmitButtonText) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputsArray = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._submitHandler = submitHandler;
        this._defaultSubmitButtonText = defaultSubmitButtonText;
    }

    close() {
        super.close()
        // this._popupForm.reset();
    }

    open() {
        super.open();
        this._popupForm.reset();
        this.resetButtonLoadingText()
    }

    //получаем кнопку сабмита
    _getSubmitButton() {
        return this._popup.querySelector(".popup__submit-button");
    }

    setButtonLoadingText() {
        this._getSubmitButton().textContent = "Сохранение...";
    }

    resetButtonLoadingText() {
        this._getSubmitButton().textContent = this._defaultSubmitButtonText;
    }
    
    _getInputValues() {
        const inputValues = {}

        this._inputsArray.forEach((input) => {
            inputValues[input.name] = input.value;
        });

        return inputValues;
    }

    getPopupForm() {
        return this._popupForm;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitHandler(this._getInputValues());
            this.setButtonLoadingText();
            this.close();
        });
    }
}
