import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './cards.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

// constants
const popupEdit = document.querySelector('.popup-edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');

const popupAdd = document.querySelector('.popup-card-add');
const addButton = document.querySelector('.profile__add-button');
const cardFormElement = document.forms["card_info"];
const titleInput = popupAdd.querySelector('.popup__input_type_title');
const linkInput = popupAdd.querySelector('.popup__input_type_link');

const cardList = document.querySelector('.elements__list');
const formsArray = Array.from(document.forms);
const formValidatorPlus = {};

const popupEditForm = new PopupWithForm('.popup-edit-profile', handleEditFormSubmit);
popupEditForm.setEventListeners();

const popupCardForm = new PopupWithForm('.popup-card-add', handleCardFormSubmit);
popupCardForm.setEventListeners();

const popupWithImage = new PopupWithImage('.popup-pic');
popupWithImage.setEventListeners();


///ФУНКЦИЯ ВВОДА ДАННЫХ НОВОЙ КАРТОЧКИ
function handleCardFormSubmit() {
    const newCard = { name: titleInput.value, link: linkInput.value };
    addCard(createCard(newCard));
    // card.addItem(createCard(newCard));

    //СБРОС ИНПУТОВ
    cardFormElement.reset();
}

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userAboutSelector: '.profile__about'
});

//ФУНКЦИЯ ОТПРАВКИ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function handleEditFormSubmit({ user_name, user_about }) {
    userInfo.setUserInfo({
        userNameInput: user_name,
        userAboutInput: user_about
    });
};

function handleCardClick(link, name) {
    popupWithImage.open(link, name);
}

// // ФУНКЦИЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function addCard(item) {
    cardList.prepend(item);
}

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

const card = new Section({
    items: initialCards,
    renderer: (item) => createCard(item)
},
    '.elements__list'
);

card.renderItems();

//СЛУШАТЕЛИ
editButton.addEventListener('click', () => {
    popupEditForm.open();
    const { userName, userAbout } = userInfo.getUserInfo();

    nameInput.value = userName;
    jobInput.value = userAbout;

    formValidatorPlus['user_info'].resetValidation();
});

addButton.addEventListener('click', () => popupCardForm.open());