import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import FormInput from './FormInput';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';

export default function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({card: ''});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.requestUserInfo(), api.requestCardList()])
      .then(([userInfo, cardList]) => {
        setCurrentUser(userInfo);
        setCards(cardList);
      })
      .catch(res => console.log(`Ошибка, запрос информации не выполнен. Текст ошибки: ${res}`));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    api.toggleLike(card._id, isLiked)
      .then(newCard => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Ошибка лайка. Текст ошибки: ${err}`));
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards(cards.filter(i => i !== card));
      });
  }

  function handleUpdateUser(name, about) {
    api.patchUserInfo(name, about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка, данные не отправлены. Текст ошибки: ${err}`));
  }

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
      <Main onCardDelete={handleCardDelete} onCardLike={handleCardLike} cards={cards} onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}/>
      <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen}/>
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
