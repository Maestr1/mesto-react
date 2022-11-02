import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import FormInput from './FormInput';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({card: ''});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api.requestUserInfo()
      .then(res => setCurrentUser(res))
      .catch((res) => console.log(`Ошибка, запрос информации не выполнен. Текст ошибки: ${res}`));
  });

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

    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Main onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}/>
      <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} name="edit-profile"
                     title="Редактировать профиль" buttonText="Сохранить">>
        <FormInput name="name" type="text" placeholder="Имя" id="name" minLength="2" maxLength="40"/>
        <FormInput name="about" type="text" placeholder="Профессия" id="job" minLength="2" maxLength="200"/>
      </PopupWithForm>
      <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} name="add-place"
                     title="Новое место" buttonText="Сохранить">>
        <FormInput name="placeName" type="text" placeholder="Название" id="name" minLength="2" maxLength="30"/>
        <FormInput name="placeLink" type="url" placeholder="Ссылка на картинку" id="link"/>
      </PopupWithForm>
      <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} name="edit-avatar"
                     title="Обновить аватар" buttonText="Сохранить">
        <FormInput name="link" type="url" placeholder="Ссылка на картинку" id="link" minLength="2"/>
      </PopupWithForm>
      <PopupWithForm onClose={closeAllPopups} name="confirm" title="Вы уверены?" buttonText="Да"/>
      <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard}/>
      <Footer/>
    </CurrentUserContext.Provider>
  );
}
