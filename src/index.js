import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import { initialCards } from './utils/cards.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';

import './pages/index.css'

const popupEdit = document.querySelector('.popup-edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');

const addButton = document.querySelector('.profile__add-button');
const cardFormElement = document.forms["card_info"];

const formsArray = Array.from(document.forms);
const formValidatorPlus = {};

const popupEditForm = new PopupWithForm('.popup-edit-profile', handleEditFormSubmit);
popupEditForm.setEventListeners();

const popupCardForm = new PopupWithForm('.popup-card-add', handleCardFormSubmit);
popupCardForm.setEventListeners();

const popupWithImage = new PopupWithImage('.popup-pic');
popupWithImage.setEventListeners();

const cardsSection = new Section({
    items: initialCards,
    renderer: (item) => createCard(item)
},
    '.elements__list'
);

cardsSection.renderItems();

//ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
function createCard(card) {
    const cardTemplate = new Card(card, '.elements__template', handleCardClick);
    return cardTemplate.initializeCard();
}

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userAboutSelector: '.profile__about'
});

function handleCardFormSubmit(data) {
    const newCard = { 
        name: data['addCard_title'],
        link: data['addCard_link']
    };
    cardsSection.addItem(newCard);

    //СБРОС ИНПУТОВ
    cardFormElement.reset();
}

function handleEditFormSubmit({ user_name, user_about }) {
    userInfo.setUserInfo({
        userNameInput: user_name,
        userAboutInput: user_about
    });
};

function handleCardClick(link, name) {
    popupWithImage.open(link, name);
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

//СЛУШАТЕЛИ
editButton.addEventListener('click', () => {
    popupEditForm.open();
    const { userName, userAbout } = userInfo.getUserInfo();

    nameInput.value = userName;
    jobInput.value = userAbout;

    formValidatorPlus['user_info'].resetValidation();
});

addButton.addEventListener('click', () => popupCardForm.open());