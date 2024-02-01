import css from './Contact-list.module.css';
import React from 'react';
const ContactList = ({ contacts, handleDelete }) => {
  const contactlist = contacts.map(({ id, name, number }) => (
    <li className={css.item} key={id}>
      <span>
        {name}: {number}
      </span>
      <button onClick={() => handleDelete(id)} className={css.button}>
        Delete
      </button>
    </li>
  ));
  return (
    <div className={css.container}>
      <ul className={css.list}>{contactlist}</ul>
    </div>
  );
};

export default ContactList;
