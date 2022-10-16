export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_zoom ${props.isOpen ? 'popup_opened' : ''}`} id="popup-zoom">
      <div className="popup__container popup__container_type_zoom">
        <img className="popup__zoom-pic" src={props.card.link} alt={`На картинке ${props.card.name}`}/>
        <button onClick={props.onClose}  className="popup__close-btn" aria-label="Закрыть"></button>
        <p className="popup__desc">{props.card.name}</p>
      </div>
    </div>
  );
}