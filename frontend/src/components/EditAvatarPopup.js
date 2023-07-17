import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useEffect } from "react";

export default function EditAvatarPopup({isOpen, onUpdateAvatar, onClose, isLoading}) {
    const linkInput = React.useRef();

    useEffect(() => {
        linkInput.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            link: linkInput.current.value
        });
    };

    return (
        <PopupWithForm            
            name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <>
            <input ref={linkInput} id="avatar-input" type="url" name="link" className="popup__input popup__input_type_avatar" placeholder="Ссылка на картинку" required />
            <span className="avatar-input-error popup__error popup__error_type_avatar"></span>
            </>
        </PopupWithForm>
    )
}
