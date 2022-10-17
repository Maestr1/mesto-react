export default function PopupWithForm({name, isOpen, title, onClose, children}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" noValidate>
          {children}
        </form>
        <button onClick={onClose} className="popup__close-btn" aria-label="Закрыть"></button>
      </div>
    </div>
  );
}