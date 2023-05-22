import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputsArray = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._submitHandler = submitHandler;
    }

    close() {
        this._popupForm.reset();
        super.close()
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
            this.close();
        });
    }
}
