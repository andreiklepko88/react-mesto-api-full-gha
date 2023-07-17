import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleCardClick() {
    onCardClick(card)
  };

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  const currentUser = useContext(CurrentUserContext);
  const IsOwn = card.owner._id === currentUser._id || card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `cards__like ${isLiked && 'cards__like_active'}`;

  return (
    <li className="cards__item">
      {IsOwn && (<button
        onClick={handleDeleteClick}
        className="cards__delete"
        type="button"
        aria-label="Удалить карточку">
      </button>)}
      <img className="cards__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <div className="cards__name">
        <h2 className="cards__text">{card.name}</h2>
        <div className="cards__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Поставить лайк"></button>
          <span className="cards__like-amount">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}