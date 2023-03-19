// popup
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');

// edit-form
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__about');

//popup-functions
function openPopup() { 
    popup.classList.add('popup_opened');
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

//edit-form-functions
function handleFormSubmit (evt) {
    evt.preventDefault();
    
    let newName = nameInput.value;
    let newJob = jobInput.value;

    nameOutput.textContent = newName;
    jobOutput.textContent = newJob;

    closePopup();
}

//event-listeners
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);