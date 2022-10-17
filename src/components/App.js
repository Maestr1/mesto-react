import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import FormInput from './FormInput';

export default function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({card: ''});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    //setSelectedCard(null)
  }

  return (

    <div>
      <Header/>
      <Main onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}/>
      <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} name="edit-profile"
                     title="Редактировать профиль">
        <FormInput name="name" type="text" placeholder="Имя" id="name" minLength="2" maxLength="40"/>
        <FormInput name="about" type="text" placeholder="Профессия" id="job" minLength="2" maxLength="200"/>
        <button className="popup__submit-btn" type="submit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} name="add-place"
                     title="Новое место">

        <FormInput name="placeName" type="text" placeholder="Название" id="name" minLength="2" maxLength="30"/>
        <FormInput name="placeLink" type="url" placeholder="Ссылка на картинку" id="link"/>
        <button className="popup__submit-btn" type="submit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} name="edit-avatar"
                     title="Обновить аватар">
        <FormInput name="link" type="url" placeholder="Ссылка на картинку" id="link" minLength="2"/>
        <button className="popup__submit-btn" type="submit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm onClose={closeAllPopups} name="confirm" title="Вы уверены?">
        <button className="popup__submit-btn" type="submit">Да</button>
      </PopupWithForm>
      <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard}/>
      <Footer/>
    </div>
  );
}
