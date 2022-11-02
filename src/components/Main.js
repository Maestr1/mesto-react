import api from '../utils/api';
import {useEffect, useState, useContext} from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main({onCardDelete, onCardLike, cards, onAddPlace, onCardClick, onEditAvatar, onEditProfile}) {
  const currentUser = useContext(CurrentUserContext)
  //const [cardsTemp, setCards] = useState([]);


  // useEffect(() => {
  //   Promise.all([api.requestUserInfo(), api.requestCardList()])
  //     .then(([userInfo, cardList]) => {
  //       setUserName(userInfo.name);
  //       setUserDescription(userInfo.about);
  //       setUserAvatar(userInfo.avatar);
  //       setCards(cardList);
  //     })
  //     // const userId = userInfo._id;
  //     // userInfoHandler.setUserInfo(userInfo);
  //     // userInfoHandler.updateUserAvatar(userInfo);
  //     // cardLoader.renderItems(cardList)
  //     // })
  //     .catch((res) => console.log(`Ошибка, запрос информации не выполнен. Текст ошибки: ${res}`));
  // }, []);


  return (
    <main className="main">
      <section className="profile container">
        <div className="profile__wrap">
          <div onClick={onEditAvatar} className="profile__avatar-edit-btn"><img className="profile__avatar"
                                                                                      src={currentUser.avatar}
                                                                                      alt="Фото пользователя"/>
          </div>
          <div className="profile__desc">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__job">{currentUser.about}</p>
            <button onClick={onEditProfile} className="btn profile__edit-btn"
                    aria-label="Редактировать профиль"></button>
          </div>
        </div>
        <button onClick={onAddPlace} className="btn profile__add-btn" aria-label="Добавить место"></button>
      </section>
      <section>
        <ul className="gallery container">
          {cards.map(item=>(
            <Card onCardDelete={onCardDelete} onCardLike={onCardLike} onCardClick={onCardClick} card={item}/>
          ))}
        </ul>
      </section>

    </main>
  );
}