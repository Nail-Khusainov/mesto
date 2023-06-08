export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._subButton = this._form.querySelector(this._config.submitButtonSelector);
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
  _disableSubButton() {
    this._subButton.setAttribute('disabled', '');
    this._subButton.classList.add(this._config.inactiveButtonClass);
  }

  //функция включения кнопки сабмита
  _enableSubButton() {
    this._subButton.removeAttribute('disabled');
    this._subButton.classList.remove(this._config.inactiveButtonClass);
  }

  //функция изменения состояния кнопки сабмита в зависимости от валидности
  _toggleButtonValidity() {
    if (this._form.checkValidity()) {
      this._enableSubButton();
    } else {
      this._disableSubButton();
    }
  }

  //функция сброса ошибок
  // resetValidation() {
  //   this._toggleButtonValidity();
  //   this._inputList.forEach((input) => {
  //     this._hideInputError(input);
  //   });
  // }

  //функция валидации форм
  enableValidation() {

    this._toggleButtonValidity();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonValidity();
      });
    });

    this._form.addEventListener('reset', () => {
      this._disableSubButton();
      this._inputList.forEach((input) => {
        this._hideInputError(input);
      });
    });

  }
}