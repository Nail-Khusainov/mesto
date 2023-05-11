export default class Card {
  constructor(data, templateSelector, cardImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._cardImagePopup = cardImagePopup;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.elements__image');
    this._cardTitle = this._cardElement.querySelector('.elements__card-title');
    this._deleteButton = this._cardElement.querySelector('.elements__delete-button');
    this._likeButton = this._cardElement.querySelector('.elements__like-button');
  }

  //получаем шаблон
  _getTemplate() {
    const templateCard = document.querySelector(this._templateSelector).content;
    const cardElement = templateCard.querySelector('.elements__card').cloneNode(true);

    return cardElement;
  }

  //заполняем шаблон
  _fillTemplate() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
  }

  //создаем карту
  initializeCard() {
    this._fillTemplate();
    this._setEventListeners();
    return this._cardElement;
  }

  //ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ
    _deleteCard() {
      this._cardElement.remove();
  }

  //ФУНКЦИЯ ЛАЙКА
    _toggleLike() {
      this._likeButton.classList.toggle('elements__like-button_active');
  }

  //вешаем слушатели
  _setEventListeners() {

      this._deleteButton.addEventListener('click', () => this._deleteCard());

      this._likeButton.addEventListener('click', () => this._toggleLike());

      this._cardImage.addEventListener('click', () => this._cardImagePopup(this._link, this._name)) 
  }
}
