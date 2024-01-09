import './contact-list.css';
const ContactList = ({ contacts, handleClick }) => {
  const contactlist = contacts.map(contact => (
    <li className="item" key={contact.id}>
      <span>{contact.name}</span>:<span> {contact.number}</span>
      <button on onClick={() => handleClick(contact.id)}>Delete</button>
    </li>
  ));
  return (
    <div className="contacts">
      <ul>{contactlist}</ul>
    </div>
  );
};

export default ContactList;
