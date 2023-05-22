import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup-pic__image');
        this._popupCaption = this._popup.querySelector('.popup-pic__caption');
    }


    open(link, name) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupCaption.textContent = link;

        
        super.open();
    }
}
