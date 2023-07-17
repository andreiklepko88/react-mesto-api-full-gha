import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useEffect } from "react";

export default function AddPlacePopup({ isLoading, isOpen, onAddPlace, onClose }) {
    
        const newName = React.useRef();
        const newLink = React.useRef();

        useEffect(() => {
            newName.current.value = '';
            newLink.current.value = '';
        }, [isOpen])

        function handleFormSubmit(e) {
            e.preventDefault();
            onAddPlace({
                name: newName.current.value,
                link: newLink.current.value
            })
        }

    return (
        <PopupWithForm
            name="cards"
            title="Новое место"
            buttonText="Создать"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
        >
            <>
            <input ref={newName} id="place-input" type="text" name="place-input" className="popup__input popup__input_type_place" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="place-input-error popup__error popup__error_type_place"></span>
            <input ref={newLink} id="link-input" type="url" name="link-input" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required />
            <span className="link-input-error popup__error popup__error_type_link"></span>
            </> 
        </PopupWithForm>
    )
}
