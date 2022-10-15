export default function ImagePopup() {
  return (
    <div className="popup popup_type_zoom" id="popup-zoom">
      <div className="popup__container popup__container_type_zoom">
        <img className="popup__zoom-pic" src="src/components/App#" alt=""/>
        <button className="popup__close-btn" aria-label="Закрыть"></button>
        <p className="popup__desc"></p>
      </div>
    </div>
  )
}