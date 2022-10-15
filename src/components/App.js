import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';

export default function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
  }

  return (

    <div>
      <Header/>
      <Main popupState={{isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen}}
            onClose={closeAllPopups}
            onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}/>
      <Footer/>
      <template className="card-template">
        <li className="gallery__card">
          <img className="gallery__pic" src="src/components/App#" alt=""/>
          <button className="gallery__remove-btn" aria-label="Удалить место"></button>
          <div className="gallery__desc">
            <h2 className="gallery__title"></h2>
            <div className="gallery__like-wrap">
              <button className="gallery__like-btn" aria-label="Поставить лайк"></button>
              <p className="gallery__like-counter">err</p>
            </div>
          </div>
        </li>
      </template>
    </div>
  );
}
