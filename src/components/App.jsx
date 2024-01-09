import React from 'react';
import FormInput from './Form-input/form-input';
import ContactList from './Contact-list/contact-list';
import Filter from './Filter/filter';
import { nanoid } from 'nanoid';
import NotificationMessage from './notification-message/NotificationMessage';
export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  sendContactData = data => {
    const isContact = this.state.contacts.find(el => el.number === data.number);
    if (isContact) return alert('Контакт Існує');
    const userData = { ...data, id: nanoid() };
    const contactsFromLocalStorage =
      JSON.parse(localStorage.getItem('contactsList')) || [];
    const updatedContacts = [...contactsFromLocalStorage, userData];

    localStorage.setItem('contactsList', JSON.stringify(updatedContacts));
    this.setState(prevState => ({
      contacts: [...prevState.contacts, userData],
    }));
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
    const contactsFromLocalStorage =
      JSON.parse(localStorage.getItem('contactsList')) || [];
    const updatedContacts = [
      ...contactsFromLocalStorage.filter(el => el.id !== id),
    ];
    localStorage.setItem('contactsList', JSON.stringify(updatedContacts));
  };

  filterContact = ({ target: { value } }) => {
    this.setState({
      filter: value.toString(),
    });
  };

  render() {
    const filteredContacts = JSON.parse(
      localStorage.getItem('contactsList')
    ).filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div
        style={{
          width: '300px',
          margin: '200px auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <h1>PhoneBook</h1>
        <FormInput
          change={this.handleChange}
          sendContactData={this.sendContactData}
        />
        <h2>Contacts</h2>
        <Filter change={this.filterContact} />
        {filteredContacts.length === 0 ? (
          <NotificationMessage message={`No contact ${this.state.filter}`} />
        ) : (
          <ContactList
            contacts={JSON.parse(localStorage.getItem('contactsList'))}
            handleClick={this.deleteContact}
          />
        )}
      </div>
    );
  }
}
