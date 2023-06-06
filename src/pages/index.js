import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { Api } from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import './index.css'

const popupEdit = document.querySelector('.popup-edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');

const addButton = document.querySelector('.profile__add-button');
const editAvatarBtn = document.querySelector(".profile__avatar-edit-btn");

const formsArray = Array.from(document.forms);
const formValidatorPlus = {};

const popupEditForm = new PopupWithForm('.popup-edit-profile', handleEditFormSubmit, "Сохранить");
popupEditForm.setEventListeners();

const popupCardForm = new PopupWithForm('.popup-card-add', handleCardFormSubmit, "Создать");
popupCardForm.setEventListeners();

const popupAvatarForm = new PopupWithForm('.popup-edit-avatar', handleAvatarFormSubmit, "Сохранить");
popupAvatarForm.setEventListeners();

const popupWithImage = new PopupWithImage('.popup-pic');
popupWithImage.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation('.popup-card-confirm', handleConfirmFormSubmit, "Да");
popupWithConfirmation.setEventListeners();


const api = new Api(
    {
        baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
        headers: {
            authorization: '820534b3-b689-4c68-920e-3e0fc31314d3',
            'Content-Type': 'application/json'
        }
    }
);

//Добавляем данные пользователя с сервера
api.getUserInfoFromServer()
    .then(res => {
        userInfo.setUserInfo({
            userNameInput: res.name,
            userAboutInput: res.about,
            userId: res._id
        });
        userInfo.setAvatar({
            userAvatar: res.avatar
        });

    })
    .catch((error) => {
        console.log(`Error loading user info: ${error}`);
    });

//Добавляем карточки с сервера
api.getInitialCards()
    .then((res) => {
        cardsSection.setItems(res.reverse());
        cardsSection.renderItems();
    })
    .catch((error) => {
        console.log(`Error loading initial cards: ${error}`);
    });

const cardsSection = new Section(
    {
        items: [],
        renderer: createCard
    },
    '.elements__list'
);

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userAboutSelector: '.profile__about',
    userAvatarSelector: '.profile__image'
});

//ФУНКЦИЯ ДОБАВЛЕНИЯ ЛАЙКА
function addLike(card) {
    api.addLike(card.getID())
        .then(data => {
            card.reloadLikes(data.likes.length, true);
        })
        .catch((error) => {
            console.log(`Error add like: ${error}`)
        });
}

//ФУНКЦИЯ УДАЛЕНИЯ ЛАЙКА
function deleteLike(card) {
    api.deleteLike(card.getID())
        .then(data => {
            card.reloadLikes(data.likes.length, false);
        })
        .catch((error) => {
            console.log(`Error delete like: ${error}`)
        });
}

// ПРОВЕРКА ID ЛАЙКА ТЕКУЩЕГО ЮЗЕРА
function checkLikeStatus(likesList) {
    return likesList.find(like => like._id === userInfo.getUserId()) !== undefined;
}

//ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
function createCard(card) {
    const cardTemplate = new Card(
        card,
        '.elements__template',
        handleCardClick,
        openConfirmPopup,
        addLike,
        deleteLike,
        { checkId: userInfo.getUserId() === card.owner._id },
        { likeButtonStatus: checkLikeStatus(card.likes) });

    return cardTemplate.initializeCard();
}

function openConfirmPopup(card) {
    popupWithConfirmation.open(card)
}

function handleCardFormSubmit({ addCard_title, addCard_link }) {
    const newCard = {
        name: addCard_title,
        link: addCard_link
    };
    api
        .setCard(newCard)
        .then((res) => {
            cardsSection.addItem(res);
        })
};

function handleConfirmFormSubmit(card) {
    api
        .deleteCard(card.getID())
        .then((res) => {
            card.deleteCard()
            console.log(res)
        })
        .catch((error) => {
            console.log(`Error delete card: ${error}`);
        })
};

function handleEditFormSubmit({ user_name, user_about }) {
    api
        .setNewUserInfo({ user_name, user_about })
        .then((res) => {
            userInfo.setUserInfo({
                userNameInput: res.name,
                userAboutInput: res.about
            });
        })
};

function handleAvatarFormSubmit({ user_avatar }) {
    api
        .setAvatar({ user_avatar })
        .then((res) => {
            userInfo.setAvatar({
                userAvatar: res.avatar,
            });
        })
        .catch((error) => {
            console.log(`Error set avatar: ${error}`);
        })
};

//слушатель попапа карточки
function handleCardClick(link, name) {
    popupWithImage.open(link, name);
};

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
    const { user_name, user_about } = userInfo.getUserInfo();

    nameInput.value = user_name;
    jobInput.value = user_about;

    formValidatorPlus['user_info'].resetValidation();
});

addButton.addEventListener('click', () => popupCardForm.open());

editAvatarBtn.addEventListener('click', () => popupAvatarForm.open());


