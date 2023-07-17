export default function ImagePopup({isOpen, selectedCard, onClose}) {
    return(
        <div className={`popup popup_img_big ${isOpen && "popup_opened"}`}>
            <div className="popup__image-container">
                <figure className="popup__figure">
                    <img className="popup__image" src={selectedCard.link} alt={selectedCard.name}/>
                    <figcaption className="popup__caption">{selectedCard.name}</figcaption>
                </figure>
                <button className="popup__icon-close" type="button" aria-label="закрыть" onClick={onClose}></button>
            </div>
        </div>
        )   
}