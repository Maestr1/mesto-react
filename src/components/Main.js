import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import React from 'react';

export default function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.requestUserInfo(), api.requestCardList()])
      .then(([userInfo, cardList]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards([cardList])
        // const userId = userInfo._id;
        // userInfoHandler.setUserInfo(userInfo);
        // userInfoHandler.updateUserAvatar(userInfo);
        // cardLoader.renderItems(cardList)
      })
      .catch((res) => console.log(`Ошибка, запрос информации не выполнен. Текст ошибки: ${res}`));
  });

  return (
    <main className="main">
      <section className="profile container">
        <div className="profile__wrap">
          <div onClick={props.onEditAvatar} className="profile__avatar-edit-btn"><img className="profile__avatar"
                                                                                      src={userAvatar}
                                                                                      alt="Фото пользователя"/>
          </div>
          <div className="profile__desc">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__job">{userDescription}</p>
            <button onClick={props.onEditProfile} className="btn profile__edit-btn"
                    aria-label="Редактировать профиль"></button>
          </div>
        </div>
        <button onClick={props.onAddPlace} className="btn profile__add-btn" aria-label="Добавить место"></button>
      </section>
      <section>
        <ul className="gallery container">
        </ul>
      </section>
      <PopupWithForm onClose={props.onClose} isOpen={props.popupState.isEditProfilePopupOpen} name="edit-profile"
                     title="Редактировать профиль"/>
      <PopupWithForm onClose={props.onClose} isOpen={props.popupState.isAddPlacePopupOpen} name="add-place"
                     title="Новое место"/>
      <PopupWithForm onClose={props.onClose} isOpen={props.popupState.isEditAvatarPopupOpen} name="edit-avatar"
                     title="Обновить аватар"/>
      <PopupWithForm onClose={props.onClose} name="confirm" title="Вы уверены?"/>
      <ImagePopup/>
    </main>
  );
}