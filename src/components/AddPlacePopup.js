import FormInput from './FormInput';
import PopupWithForm from './PopupWithForm';
import {useState} from 'react';

export default function AddPlacePopup({onAddPlace, onClose, isOpen}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({name, link});
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} name="add-place"
                   title="Новое место" buttonText="Сохранить">>
      <FormInput value={name} onChange={handleChangeName} name="placeName" type="text" placeholder="Название" id="name"
                 minLength="2" maxLength="30"/>
      <FormInput value={link} onChange={handleChangeLink} name="placeLink" type="url" placeholder="Ссылка на картинку"
                 id="link"/>
    </PopupWithForm>
  );
}