import React from 'react';

export default function Card(props) {

  function handleClick() {
    props.onCardClick(props.card)
  }

  return (
    <li className="gallery__card">
      <img onClick={handleClick} className="gallery__pic" src={props.card.link} alt={`На картинке ${props.card.name}`}/>
      <button className="gallery__remove-btn" aria-label="Удалить место"></button>
      <div className="gallery__desc">
        <h2 className="gallery__title">{props.card.name}</h2>
        <div className="gallery__like-wrap">
          <button className="gallery__like-btn" aria-label="Поставить лайк"></button>
          <p className="gallery__like-counter">err</p>
        </div>
      </div>
    </li>
  );
}
