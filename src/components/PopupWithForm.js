import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputsArray = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._submitHandler = submitHandler;
        // this._defaultSubmitButtonText = defaultSubmitButtonText;
        this._submitButtonText = this._submitButton.textContent
    }

    close() {
        super.close()
        this._popupForm.reset();
    }

    // open() {
    //     super.open();
    //     this.resetButtonLoadingText()
    // }

    // setButtonLoadingText() {
    //     this._submitButton.textContent = "Сохранение...";
    // }

    // resetButtonLoadingText() {
    //     this._submitButton.textContent = this._defaultSubmitButtonText;
    // }


    // renderLoading(isLoading, loadingText) {
    //     if (isLoading) {
    //         this._submitButton.textContent = loadingText;
    //     } else {
    //         this._submitButton.textContent = this._defaultSubmitButtonText;
    //     }
    // }

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._submitButton.textContent = loadingText;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    _getInputValues() {
        const inputValues = {}

        this._inputsArray.forEach((input) => {
            inputValues[input.name] = input.value;
        });

        return inputValues;
    }

    // setInputValues(data) {
    //     this._inputsArray.forEach((input) => {
    //       // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
    //       input.value = data[input.name];
    //     });
    //   }

    getPopupForm() {
        return this._popupForm;
    }


    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitHandler(this._getInputValues());
            // this.setButtonLoadingText();
            // this.close(); удалить
        });
    }
}
