import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function PopupWithConfirmation({isOpen, onClose, onDeleteCard, isLoading}) {
    return (
        <PopupWithForm
            name="confirmation"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onDeleteCard}
            isLoading={isLoading}
        ></PopupWithForm>
    )
}