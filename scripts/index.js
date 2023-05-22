import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './cards.js';
import { Config } from './Config.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

const popups = document.querySelectorAll('.popup');
// ПЕРЕМЕННЫЕ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const popupEdit = document.querySelector('.popup-edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const editFormElement = document.forms["user_info"];
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__about');

// ПЕРЕМЕННЫЕ ПОПАПА ДОБАВЛЕНИЯ КАРТОЧЕК
const popupAdd = document.querySelector('.popup-card-add');
const addButton = document.querySelector('.profile__add-button');
const cardFormElement = document.forms["card_info"];
const titleInput = popupAdd.querySelector('.popup__input_type_title');
const linkInput = popupAdd.querySelector('.popup__input_type_link');

//ЛИСТ КАРТОЧЕК
const cardList = document.querySelector('.elements__list');

//ПОПАП-КАРТИНКА КАРТОЧКИ
const popupCard = document.querySelector('.popup-pic');
const popupImage = popupCard.querySelector('.popup-pic__image');
const popupCaption = popupCard.querySelector('.popup-pic__caption');

const formsArray = Array.from(document.forms);

const formValidatorPlus = {};



// //new code
// const popupWithImage = new PopupWithImage('.popup-pic');

const popupEditForm = new PopupWithForm('.popup-edit-profile', handleEditFormSubmit );
popupEditForm.setEventListeners();


const popupCardForm = new PopupWithForm('.popup-card-add', handleCardFormSubmit);
popupCardForm.setEventListeners();


const popupWithImage = new PopupWithImage('.popup-pic');
popupWithImage.setEventListeners();


const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userAboutSelector: '.profile__about'
});

//ФУНКЦИЯ ОТПРАВКИ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function handleEditFormSubmit({ userNameInput, userAboutInput }) {
console.log({ userNameInput, userAboutInput });
    userInfo.setUserInfo ({ 
        userNameInput,
        userAboutInput
    });

    // const newName = inputValues['user_name'];
    // const newJob = inputValues['user_about'];

    // nameOutput.textContent = newName;
    // jobOutput.textContent = newJob;
};


function handleCardClick(link, name) {
    // popupImage.src = link;
    // popupImage.alt = name;
    // popupCaption.textContent = name;

    popupWithImage.open(link, name);
}


//ФУНКЦИЯ ЗАКРТЫТИЯ ПОПАПА через оверлей или кнопку

// popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//         if (evt.target.classList.contains('popup_opened')) {
//             closePopup(popup)
//         }
//         if (evt.target.classList.contains('popup__close-button')) {
//           closePopup(popup)
//         }
//     })
// })

//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА КНОПКОЙ ESC
// const closePopupEsc = (evt) => {
//     if (evt.key === "Escape" ) {
//         const popupOpened = document.querySelector(".popup_opened");
//         if (popupOpened) closePopup(popupOpened);
//     };
// }

// //ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА
// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener("keydown", closePopupEsc);
// }

// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА
// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupEsc);
// }



// СЛУШАТЕЛЬ ОТПРАВКИ ФОРМЫ ПРОФИЛЯ
// editFormElement.addEventListener('submit', handleEditFormSubmit);

// ФУНКЦИЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function addCard(item) {
    cardList.prepend(item);
}

///ФУНКЦИЯ ВВОДА ДАННЫХ НОВОЙ КАРТОЧКИ

function handleCardFormSubmit() {
    const newCard = { name: titleInput.value, link: linkInput.value };
    addCard(createCard(newCard));

    //СБРОС ИНПУТОВ
    cardFormElement.reset();
}

// СЛУШАТЕЛЬ ОТПРАВКИ ФОРМЫ ДЛЯ КАРТОЧКИ
// cardFormElement.addEventListener('submit', handleCardFormSubmit);

//ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
function createCard(card) {
    const cardTemplate = new Card(card, '.elements__template', handleCardClick);
    return cardTemplate.initializeCard();
}

formsArray.forEach(item => {
    const formValidator = new FormValidator({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit-button',
        openPopupButtonSelector: '.open-popup-button',
        inactiveButtonClass: 'popup__submit-button_disabled',
        inputErrorClass: 'popup__input-error',
        errorUnderlineClass: 'popup__input_invalid',
    },
        item);

    const formName = item.getAttribute('name');
    formValidatorPlus[formName] = formValidator;

    formValidator.enableValidation();
})

//ФУНКЦИЯ ПОПАПА КАРТИНКИ КАРТОЧКИ
// function cardImagePopup(link, name) {
//     popupImage.src = link;
//     popupImage.alt = name;
//     popupCaption.textContent = name;
//     openPopup(popupCard);
// }

//ФУНКЦИЯ ВЫВОДА ДЕФОЛТНЫХ КАРТОЧЕК
// initialCards.forEach(function (card) {
//     addCard(createCard(card));
// });

const defaultCards = new Section({
    items: initialCards,
    renderer: (item) => createCard(item)
},
    '.elements__list'
);
defaultCards.renderItems();


//СЛУШАТЕЛИ
editButton.addEventListener('click', () => {
    // openPopup(popupEdit);
    popupEditForm.open();

    const { userName, userAbout } = userInfo.getUserInfo();

    nameInput.value = userName;
    jobInput.value = userAbout;

    // nameInput.value = nameOutput.textContent;
    // jobInput.value = jobOutput.textContent;

    formValidatorPlus['user_info'].resetValidation();
});

addButton.addEventListener('click', () => popupCardForm.open());