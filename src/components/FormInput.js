import React from 'react';

export default function FormInput({name, type, placeholder, minLength, maxLength, id}) {
  return (
    <div className="popup__input-wrap">
      <input type={type} name={name} placeholder={placeholder} className="popup__input"
             id={`popup-edit-input-${id}`} required minLength={minLength} maxLength={maxLength}/>
      <span id={`popup-edit-input-${id}-error`} className="popup__input-error"></span>
    </div>
  );
}