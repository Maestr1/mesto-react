import api from '../utils/api';
import {useEffect, useState} from 'react';
import Card from './Card';

export default function Main({onAddPlace, onCardClick, onEditAvatar, onEditProfile}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.requestUserInfo(), api.requestCardList()])
      .then(([userInfo, cardList]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(cardList);
      })
      // const userId = userInfo._id;
      // userInfoHandler.setUserInfo(userInfo);
      // userInfoHandler.updateUserAvatar(userInfo);
      // cardLoader.renderItems(cardList)
      // })
      .catch((res) => console.log(`Ошибка, запрос информации не выполнен. Текст ошибки: ${res}`));
  }, []);


  return (
    <main className="main">
      <section className="profile container">
        <div className="profile__wrap">
          <div onClick={onEditAvatar} className="profile__avatar-edit-btn"><img className="profile__avatar"
                                                                                      src={userAvatar}
                                                                                      alt="Фото пользователя"/>
          </div>
          <div className="profile__desc">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__job">{userDescription}</p>
            <button onClick={onEditProfile} className="btn profile__edit-btn"
                    aria-label="Редактировать профиль"></button>
          </div>
        </div>
        <button onClick={onAddPlace} className="btn profile__add-btn" aria-label="Добавить место"></button>
      </section>
      <section>
        <ul className="gallery container">
          {cards.map(item=>(
            <Card onCardClick={onCardClick} card={item}/>
          ))}
        </ul>
      </section>

    </main>
  );
}