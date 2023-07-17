import { useContext } from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";



export default function Main({onCardClick, onEditProfile,  onAddPlace, onEditAvatar, cards, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">

        <section className="profile">
          <div className = "profile__avatar-container" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля"/>
          </div>
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button className="profile__add-place" type="button" aria-label="Добавить место" onClick={onAddPlace}></button>
        </section>

        <section className="cards">
          <ul className="cards__list">
            {cards.map((card) =>
            <Card 
            key={card._id} 
            onCardClick={onCardClick} 
            card={card} 
            onCardLike={onCardLike} 
            onCardDelete={onCardDelete}/>
            )}
          </ul>
        </section>
    </main>
  )
}