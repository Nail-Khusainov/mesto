export default class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
    }

    //получаем шаблон
    _getTemplate() {
      const templateCard = document.querySelector(this._templateSelector).content;
      const cardElement = templateCard.querySelector('.elements__card').cloneNode(true);

      return cardElement;
    }

    //заполняем шаблон
    _fillTemplate(cardElement) {
      const cardImage = this._getCardImage(cardElement);
      cardImage.src = this._link;
      cardImage.alt = this._name;

      const cardTitle = cardElement.querySelector('.elements__card-title');
      cardTitle.textContent = this._name;
    }

    //создаем карту
    initializeCard() {
      const templateCard = this._getTemplate();
      this._fillTemplate(templateCard);

      this._setEventListeners(templateCard);

      return templateCard;
    }

    //получаем картинку
    _getCardImage(cardElement) {
      return cardElement.querySelector('.elements__image');      
    }


    //вешаем слушатели и допфункции
    _setEventListeners(cardElement) {
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
              popupImage.src = this._link;
              popupImage.alt = this._name;
              popupCaption.textContent = this._name;
              openPopup(popupCard);
          }
          const cardImage = this._getCardImage(cardElement);
          cardImage.addEventListener('click', cardImagePopup);
    }
}
  

  