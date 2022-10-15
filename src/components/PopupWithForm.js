export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" noValidate>
          <div className="popup__input-wrap">
            <input type="text" name="name" placeholder="Имя" className="popup__input"
                   id="popup-edit-input-name" required minLength="2" maxLength="40"/>
            <span id="popup-edit-input-name-error" className="popup__input-error"></span>
          </div>
          <div className="popup__input-wrap">
            <input type="text" name="about" placeholder="Профессия" className="popup__input"
                   id="popup-edit-input-job" required minLength="2" maxLength="200"/>
            <span id="popup-edit-input-job-error" className="popup__input-error"></span>
          </div>
          <button className="popup__submit-btn" type="submit">Сохранить</button>
        </form>
        <button onClick={props.onClose} className="popup__close-btn" aria-label="Закрыть"></button>
      </div>
    </div>
  );
}