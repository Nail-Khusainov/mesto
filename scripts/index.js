// ПЕРЕМЕННЫЕ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const popupEdit = document.querySelector('.popup__edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const editCloseButton = popupEdit.querySelector('.popup__close-button');
const editFormElement = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__about');

// ПЕРЕМЕННЫЕ ПОПАПА ДОБАВЛЕНИЯ КАРТОЧЕК
const popupAdd = document.querySelector('.popup__card-add');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = popupAdd.querySelector('.popup__close-button');
const cardFormElement = popupAdd.querySelector('.popup__form');
const titleInput = popupAdd.querySelector('.popup__input_type_title');
const linkInput = popupAdd.querySelector('.popup__input_type_link');

//ЛИСТ КАРТОЧЕК
const cardList = document.querySelector('.elements__list');

//ПОПАП-КАРТИНКА КАРТОЧКИ
const popupCard = document.querySelector('.popup-pic');
const popupImage = popupCard.querySelector('.popup-pic__image');
const popupCaption = popupCard.querySelector('.popup-pic__caption');
const popupCardCloseButton = popupCard.querySelector('.popup__close-button');

//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА
function openPopup(popup) { //(popup added)
    popup.classList.add('popup_opened');
}
//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА
function closePopup(popup) {//(popup added)
    popup.classList.remove('popup_opened');
}

//ФУНКЦИЯ ОТПРАВКИ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function handleEditFormSubmit (evt) {
    evt.preventDefault();
    
    let newName = nameInput.value;
    let newJob = jobInput.value;

    nameOutput.textContent = newName;
    jobOutput.textContent = newJob;

    closePopup(popupEdit);
}
// СЛУШАТЕЛЬ ОТПРАВКИ ФОРМЫ ПРОФИЛЯ
editFormElement.addEventListener('submit', handleEditFormSubmit);

// ФУНКЦИЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function addCard(item) {
    cardList.prepend(item);
}

///ФУНКЦИЯ ВВОДА ДАННЫХ НОВОЙ КАРТОЧКИ

function handleCardFormSubmit (evt) {
    evt.preventDefault();
    const newCard = {name: titleInput.value, link: linkInput.value};
    addCard(createCard(newCard));
    closePopup(popupAdd);
    cardFormElement.reset()
}
// СЛУШАТЕЛЬ ОТПРАВКИ ФОРМЫ ДЛЯ КАРТОЧКИ
cardFormElement.addEventListener('submit', handleCardFormSubmit);

//ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
function createCard(card) {
    const templateCard = document.querySelector('.elements__template').content;
    const cardElement = templateCard.querySelector('.elements__card').cloneNode(true);
   
    const cardImage = cardElement.querySelector('.elements__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const cardTitle = cardElement.querySelector('.elements__card-title');
    cardTitle.textContent = card.name;
    
//ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ
    const сardDelButton = cardElement.querySelector('.elements__delete-button');
    function deleteCard() {
        cardElement.remove();
    }
    сardDelButton.addEventListener('click', deleteCard);

//ФУНКЦИЯ ЛАЙКА
    const cardLikeButton = cardElement.querySelector('.elements__like-button');
    function like() {
        cardLikeButton.classList.toggle('elements__like-button_active');
    }
    cardLikeButton.addEventListener('click', like);

//ФУНКЦИЯ ПОПАПА КАРТИНКИ КАРТОЧКИ
    function cardImagePopup() {
        popupImage.src = card.link;
        popupImage.alt = card.name;
        popupCaption.textContent = card.name;
        openPopup(popupCard);
    }
    cardImage.addEventListener('click', cardImagePopup);

//ВОЗВРАТ КАРТОЧКИ
    return cardElement;
}

//ФУНКЦИЯ ВЫВОДА ДЕФОЛТНЫХ КАРТОЧЕК
initialCards.forEach(function(card) {
    addCard(createCard(card));
});

//СЛУШАТЕЛИ
editButton.addEventListener('click', function() {
    openPopup(popupEdit);
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
  });

addButton.addEventListener('click', function() {
    openPopup(popupAdd);
  });

editCloseButton.addEventListener('click', function() {
    closePopup(popupEdit);
});

addCloseButton.addEventListener('click', function() {
    closePopup(popupAdd);
    cardFormElement.reset()
});

popupCardCloseButton.addEventListener('click', function() {
    closePopup(popupCard);
});