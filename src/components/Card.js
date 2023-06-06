export default class Card {
  constructor
    (
      { name, link, _id, owner, likes },
      templateSelector,
      handleCardClick,
      openConfirmPopup,
      addLike,
      deleteLike,
      { checkId },
      { likeButtonStatus }
    ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._ownerID = owner._id;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openConfirmPopup = openConfirmPopup;
    this.checkId = checkId;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.elements__image');
    this._cardTitle = this._cardElement.querySelector('.elements__card-title');
    this._deleteButton = this._cardElement.querySelector('.elements__delete-button');
    this._addLike = addLike;
    this._deleteLike = deleteLike;
    this._likeButton = this._cardElement.querySelector('.elements__like-button');
    this._likesCounter = this._cardElement.querySelector('.elements__likes-counter');
    this._likeButtonActiveClass = 'elements__like-button_active';
    this._likesNumber = this._likes.length;
    this.likeButtonStatus = likeButtonStatus;
  }

  //получаем шаблон
  _getTemplate() {
    const templateCard = document.querySelector(this._templateSelector).content;
    const cardElement = templateCard.querySelector('.elements__card').cloneNode(true);

    return cardElement;
  }

  // проверка статуса лайка юзера
  _setLikeButtonStatus() {
    if (this.likeButtonStatus) {
      this._likeButton.classList.add(this._likeButtonActiveClass);
    } else {
      this._likeButton.classList.remove(this._likeButtonActiveClass);
    }
  }

  // рендер количества лайков
  renderLikes(likesCounter) {
    this._likesCounter.textContent = likesCounter;
  }

  //обновляем лайкои
  reloadLikes(likesCounter, likeButtonStatus) {
    this.likeButtonStatus = likeButtonStatus;
    this._setLikeButtonStatus();
    this.renderLikes(likesCounter);
  }

  //заполняем шаблон
  _fillTemplate() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
  }

  //ФУНКЦИЯ ЛАЙКА
  _toggleLike() {
    if (this._likeButton.classList.contains(this._likeButtonActiveClass)) {
      this._deleteLike(this);
    } else {
      this._addLike(this);
    }
  }

  //удаление кнопки корзины других юзеров
  _setDeleteBtn() {
    if (!this.checkId) {
      this._deleteButton.remove()
    }
  }

  //создаем карту
  initializeCard() {
    this._fillTemplate();
    this._setDeleteBtn();
    this.reloadLikes(this._likesNumber, this.likeButtonStatus);
    this._setEventListeners();
    return this._cardElement;
  }

  //ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ
  deleteCard() {
    this._cardElement.remove();
  }

  // получаем id 
  getID() {
    return this._id;
  }

  //вешаем слушатели
  _setEventListeners() {

    this._deleteButton.addEventListener('click', () => this._openConfirmPopup(this));

    this._likeButton.addEventListener('click', () => this._toggleLike());

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name))
  }
}
