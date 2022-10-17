import React from 'react';

export default function Card({onCardClick, card}) {

  function handleClick() {
    onCardClick(card)
  }

  return (
    <li className="gallery__card">
      <img onClick={handleClick} className="gallery__pic" src={card.link} alt={`На картинке ${card.name}`}/>
      <button className="gallery__remove-btn" aria-label="Удалить место"></button>
      <div className="gallery__desc">
        <h2 className="gallery__title">{card.name}</h2>
        <div className="gallery__like-wrap">
          <button className="gallery__like-btn" aria-label="Поставить лайк"></button>
          <p className="gallery__like-counter">err</p>
        </div>
      </div>
    </li>
  );
}
