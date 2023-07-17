export default function PopupWithForm({ title, name, buttonText, children, isOpen, onSubmit, onClose, isLoading }) {
    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <h3 className="popup__heading">{title}</h3>
                <form className="popup__form" name={name} method="post" onSubmit={onSubmit}>
                    {children}
                    <button className="popup__save" type="submit">{isLoading ? 'Сохранение...' : buttonText || 'Сохранить'}</button>
                </form>
                <button className="popup__icon-close" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}