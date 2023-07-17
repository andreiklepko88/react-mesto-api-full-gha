import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleNameChange(event) {
        setName(event.target.value)
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
      
        onUpdateUser({
          name,
          about: description,
        });
      } 

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, isOpen]); 

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            isLoading={isLoading}>
            <>
            <input value={ name|| ""} onChange={handleNameChange} id="name-input" type="text" name="name" className="popup__input popup__input_type_name" placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="name-input-error popup__error popup__error_type_name"></span>
            <input value={ description || ""} onChange={handleDescriptionChange} id="job-input" type="text" name="job" className="popup__input popup__input_type_job" placeholder="О себе" minLength="2" maxLength="200" required />
            <span className="job-input-error popup__error popup__error_type_job"></span>
            </>
        </PopupWithForm>
    )
}

