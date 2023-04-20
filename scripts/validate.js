function showInputError(input, errorElement, config) {
    input.classList.add(config.errorUnderlineClass);
    errorElement.textContent = input.validationMessage;
}

function hideInputError(input, errorElement, config) {
    input.classList.remove(config.errorUnderlineClass);
    errorElement.textContent = '';
} 

function checkInputValidity(input, config) {
    const errorElement = document.querySelector(`#error-${input.id}`)

    if (input.checkValidity()) {
        hideInputError(input, errorElement, config);
    } else {
        showInputError(input, errorElement, config);
    }
}

function disableSubButton(button, config) {
    button.setAttribute('disabled', '');
    button.classList.add(config.inactiveButtonClass)
}

function enableSubButton(button, config) {
    button.removeAttribute('disabled');
    button.classList.remove(config.inactiveButtonClass)
}

function toggleButtonValidity(form, config) {
    const subButton = form.querySelector(config.submitButtonSelector);
    if (form.checkValidity()) {
        enableSubButton(subButton, config);
    } else {
        disableSubButton(subButton, config);
    }
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    const formsArray = Array.from(forms);
    formsArray.forEach(function(form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
      });
    
        toggleButtonValidity(form, config);
    
        const inputList = form.querySelectorAll(config.inputSelector);
        const inputListArray = Array.from(inputList);
        inputListArray.forEach(function(input) {
            input.addEventListener('input',  () => {
                checkInputValidity(input, config);
                toggleButtonValidity(form, config);
          });
      });
        
      //обработчик валидности при открытии попапа
        const popupForm = document.querySelectorAll('.popup__form');
        const popupForms = Array.from(popupForm);
        popupForms.forEach(function(formElement) {
            const popupOpenButton = document.querySelectorAll('.open-popup-button');
            const popupOpenButtons = Array.from(popupOpenButton);
                popupOpenButtons.forEach(function(openPopupButtonElement) {
                 openPopupButtonElement.addEventListener('click', function() {
        // сброс ошибок в форме
        resetError(formElement, {
            inputSelector: '.popup__input',
            errorClass: 'popup__input-error',
            errorUnderlineClass: 'popup__input_invalid'
        });

        toggleButtonValidity(formElement, {
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__submit-button',
            inactiveButtonClass: 'popup__submit-button_disabled',
        });
       });
      });
     });

  });
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorUnderlineClass: 'popup__input_invalid',

});


function resetError(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const inputListArray = Array.from(inputList);
    inputListArray.forEach(function(input) {
        const errorMessage = document.querySelector(`#error-${input.id}`);
        hideInputError(input, errorMessage, config);
      });
}

// const popupForm = document.querySelectorAll('.popup__form');
// const popupForms = Array.from(popupForm);
// popupForms.forEach(function(formElement) {
//     const popupOpenButton = document.querySelectorAll('.open-popup-button');
//     const popupOpenButtons = Array.from(popupOpenButton);
//     popupOpenButtons.forEach(function(openPopupButtonElement) {
//     openPopupButtonElement.addEventListener('click', function() {
//         // сброс ошибок в форме
//         resetError(formElement, {
//             inputSelector: '.popup__input',
//             errorClass: 'popup__input-error',
//             errorUnderlineClass: 'popup__input_invalid'
//         });

//         toggleButtonValidity(formElement, {
//             inputSelector: '.popup__input',
//             submitButtonSelector: '.popup__submit-button',
//             inactiveButtonClass: 'popup__submit-button_disabled',
//         });
//     });
//   });
// })