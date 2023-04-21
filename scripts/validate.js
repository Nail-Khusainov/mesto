//функция показа ошибки инпута
function showInputError(input, errorElement, config) {
    input.classList.add(config.errorUnderlineClass);
    errorElement.textContent = input.validationMessage;
}
//функция скрытия ошибки инпута
function hideInputError(input, errorElement, config) {
    input.classList.remove(config.errorUnderlineClass);
    errorElement.textContent = '';
} 
//функция проверки валидности
function checkInputValidity(input, config) {
    const errorElement = document.querySelector(`#error-${input.id}`)

    if (input.checkValidity()) {
        hideInputError(input, errorElement, config);
    } else {
        showInputError(input, errorElement, config);
    }
}
//функция отключения кнопки сабмита
function disableSubButton(button, config) {
    button.setAttribute('disabled', '');
    button.classList.add(config.inactiveButtonClass)
}
//функция включения кнопки сабмита
function enableSubButton(button, config) {
    button.removeAttribute('disabled');
    button.classList.remove(config.inactiveButtonClass)
}
//функция изменения состояния кнопки сабмита в зависимости от валидности 
function toggleButtonValidity(form, config) {
    const subButton = form.querySelector(config.submitButtonSelector);
    if (form.checkValidity()) {
        enableSubButton(subButton, config);
    } else {
        disableSubButton(subButton, config);
    }
}
//функция валидации форм
function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    const formsArray = Array.from(forms);
    
    //обработчик сброса ошибок и состояния кнопки при открытии попапа
    const popupOpenButton = document.querySelectorAll(config.openPopupButtonSelector);
    const popupOpenButtons = Array.from(popupOpenButton);
    popupOpenButtons.forEach(function(openPopupButtonElement) {
        openPopupButtonElement.addEventListener('click', function() {
            formsArray.forEach(function(form) {
                    resetError(form, config);
                    toggleButtonValidity(form, config);
            });
        });
    });

    formsArray.forEach(function(form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        });
        
        const inputList = form.querySelectorAll(config.inputSelector);
        const inputListArray = Array.from(inputList);
        inputListArray.forEach(function(input) {
            input.addEventListener('input',  () => {
                checkInputValidity(input, config);
                toggleButtonValidity(form, config);
            });
        });
    });          
}

//кофниг
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    openPopupButtonSelector: '.open-popup-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorUnderlineClass: 'popup__input_invalid',
});

//функция сброса ошибок
function resetError(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const inputListArray = Array.from(inputList);
    inputListArray.forEach(function(input) {
        const errorMessage = document.querySelector(`#error-${input.id}`);
        hideInputError(input, errorMessage, config);
      });
}