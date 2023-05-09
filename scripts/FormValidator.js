export default class FormValidator {
    constructor(config) {
      this._config = config;
    }

    //функция показа ошибки инпута
    _showInputError(input) {
      const errorElement = document.querySelector(`#error-${input.id}`);
      input.classList.add(this._config.errorUnderlineClass);
      errorElement.textContent = input.validationMessage;
    }
    
    //функция скрытия ошибки инпута
    _hideInputError(input) {
      const errorElement = document.querySelector(`#error-${input.id}`);
      input.classList.remove(this._config.errorUnderlineClass);
      errorElement.textContent = '';
    }

    //функция проверки валидности
    _checkInputValidity(input) {
      if (input.checkValidity()) {
        this._hideInputError(input);
      } else {
        this._showInputError(input);
      }
    }

    //функция отключения кнопки сабмита
    _disableSubButton(button) {
      button.setAttribute('disabled', '');
      button.classList.add(this._config.inactiveButtonClass);
    }

    //функция включения кнопки сабмита
    _enableSubButton(button) {
      button.removeAttribute('disabled');
      button.classList.remove(this._config.inactiveButtonClass);
    }

    //функция изменения состояния кнопки сабмита в зависимости от валидности
    toggleButtonValidity(form) {
      const subButton = form.querySelector(this._config.submitButtonSelector);
      if (form.checkValidity()) {
        this._enableSubButton(subButton);
      } else {
        this._disableSubButton(subButton);
      }
    }

    //функция сброса ошибок
    resetError(form) {
      const inputList = form.querySelectorAll(this._config.inputSelector);
      inputList.forEach((input) => {
        const errorMessage = document.querySelector(`#error-${input.id}`);
        this._hideInputError(input);
      });
    }

    //функция валидации форм
    enableValidation() {
      const forms = document.querySelectorAll(this._config.formSelector);
      const formsArray = Array.from(forms);
  
      const popupOpenButton = document.querySelectorAll(
        this._config.openPopupButtonSelector
      );
      const popupOpenButtons = Array.from(popupOpenButton);
      popupOpenButtons.forEach((openPopupButtonElement) => {
        openPopupButtonElement.addEventListener('click', () => {
          formsArray.forEach((form) => {
            this.resetError(form);
            this.toggleButtonValidity(form);
          });
        });
      });
  
      formsArray.forEach((form) => {
        form.addEventListener('submit', (event) => {
          event.preventDefault();
        });
  
        const inputList = form.querySelectorAll(this._config.inputSelector);
        const inputListArray = Array.from(inputList);
        inputListArray.forEach((input) => {
          input.addEventListener('input', () => {
            this._checkInputValidity(input);
            this.toggleButtonValidity(form);
          });
        });
      });
    }
}