import SavedContact from 'components/SavedContact/savedContact';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../../redux/operations';
import { selectorContacts, selectorFilter } from '../../redux/selectors';
import css from './PhonebookForm.module.css';

const Contacts = () => {
  const contacts = useSelector(selectorContacts);
  const filter = useSelector(selectorFilter);
  const dispatch = useDispatch();

  const handleClick = async e => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.getAttribute('data-id');
      console.log(id);
      await dispatch(deleteContact(id));
      dispatch(fetchContacts());
    }
  };

  const filteredContacts = () => {
    if (filter !== '') {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else if (filter === '') {
      return contacts;
    }
  };

  return contacts.length > 0 ? (
    <ul onClick={handleClick}>
      {filteredContacts().map(({ id, name, phone }) => (
        <SavedContact key={id} id={id} name={name} number={phone} />
      ))}
    </ul>
  ) : (
    <p className="text-message">The contact list is empty.</p>
  );
};

export default Contacts;