import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({card: ''});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.requestUserInfo(), api.requestCardList()])
      .then(([userInfo, cardList]) => {
        setCurrentUser(userInfo);
        setCards(cardList);
      })
      .catch(res => console.log(`Запрос информации не выполнен. Текст ошибки: ${res}`));
  }, []);

  function handleAddPlaceSubmit(name, link) {
    api.postCard(name, link)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка, карточка не добавлена. Текст ошибки: ${err}`));
  }

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
        setCards((cards) => cards.filter(i => i !== card));
        //setCards(cards.filter(i => i !== card));
      })
      .catch(err => console.log(`Карточка не удалена. Текст ошибки: ${err}`));
  }

  function handleUpdateUser(name, about) {
    api.patchUserInfo(name, about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Данные не отправлены. Текст ошибки: ${err}`));
  }

  function handleUpdateAvatar(link) {
    api.patchUserAvatar(link)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Данные не отправлены. Текст ошибки: ${err}`));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    //setSelectedCard(null)
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Main onCardDelete={handleCardDelete}
            onCardLike={handleCardLike} cards={cards}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}/>
      <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen}/>
      <AddPlacePopup onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}/>
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}/>
      <PopupWithForm onClose={closeAllPopups}
                     name="confirm"
                     title="Вы уверены?"
                     buttonText="Да"/>
      <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard}/>
      <Footer/>
    </CurrentUserContext.Provider>
  );
}
