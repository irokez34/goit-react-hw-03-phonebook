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
  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  sendContactData = data => {
    const userData = { ...data, id: nanoid() };

    this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    )
      ? alert(data.name + ' is already in contacts')
      : this.setState(prevState => ({
          contacts: [userData, ...prevState.contacts],
        }));
  };
  deleteContact = id => {
    const FilterContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({
      contacts: [...FilterContacts],
    });
  };

  filterContact = ({ target: { value } }) => {
    this.setState({
      filter: value,
    });
  };

  render() {
    const filterToLowerCase = this.state.filter.toLowerCase();
    const filterContact = this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterToLowerCase)
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
        <FormInput sendContactData={this.sendContactData} />
        {this.state.contacts.length ? (
          <h2 className="title">Contacts</h2>
        ) : (
          <></>
        )}

        {this.state.contacts.length ? (
          <Filter value={this.state.filter} onChange={this.filterContact} />
        ) : (
          <></>
        )}
         {filterContact.length === 0 ? (
          <NotificationMessage message={`No contact ${this.state.filter}`} />
        ) : (<></>)}
        <ContactList
          contacts={filterContact}
          handleDelete={this.deleteContact}
        />
      </div>
    );
  }
}
