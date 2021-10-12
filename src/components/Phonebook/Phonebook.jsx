import { useState, useEffect } from "react";
import styles from "./Phonebook.module.css";
import { generate } from "shortid";
import ContactsList from "../ContactsList/ContactsList";
import FormMain from "../Form/Form";
import Filter from "../Filter/Filter";
import { initialState } from "./initialState";

const Phonebook = () => {
  const [contacts, setContacts] = useState(initialState.contacts);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem("contacts"));

    if (contacts?.length) {
      setContacts({
        contacts,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const isAvailableName = contacts.find((contact) => contact.name === name);
    const isAvailableNumber = contacts.find(
      (contact) => contact.number === number
    );
    if (isAvailableName) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (isAvailableNumber) {
      alert(`${number} is already in contacts`);
      return;
    }

    setContacts((prevState) => {
      const newContacts = [...prevState.contacts];
      newContacts.push({ name, number, id: generate() });
      return { contacts: newContacts };
    });
  };

  // const handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   setContacts({
  //     [name]: value,
  //   });
  // };

  const changeFilter = ({ target }) => {
    const { name, value } = target;
    setFilter({
      [name]: value,
    });
  };

  const filterInput = () => {
    const FilterLowerCase = filter.toLowerCase();
    return contacts.filter((item) =>
      item?.name?.toLowerCase().includes(FilterLowerCase)
    );
  };

  const onDelete = (idx) => {
    setContacts(({ contacts }) => {
      const deleteContact = contacts.filter((contact) => contact.id !== idx);
      return { contacts: deleteContact };
    });
  };

  const Contacts = filterInput();
  return (
    <div className={styles.container}>
      <h2 className={styles.Title}>Phonebook</h2>
      <FormMain onSubmit={addContact} />
      <h2 className={styles.Title}>Contacts</h2>
      <Filter onChange={changeFilter} value={filter} />
      <ContactsList list={Contacts} onDelete={onDelete} />
    </div>
  );
};

export default Phonebook;

// class Phonebook extends Component {
//   state = {
//     contacts: [
//       { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//       { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//       { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//       { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
//     ],
//     filter: "",
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem("contacts"));

//     if (contacts?.length) {
//       this.setState({
//         contacts,
//       });
//     }
//   }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (
//       JSON.stringify(prevState.contacts) !== JSON.stringify(this.state.contacts)
//     ) {
//       localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;
//     const isAvailableName = contacts.find((contact) => contact.name === name);
//     const isAvailableNumber = contacts.find(
//       (contact) => contact.number === number
//     );
//     if (isAvailableName) {
//       alert(`${name} is already in contacts`);
//     } else if (isAvailableNumber) {
//       alert(`${number} is already in contacts`);
//     } else {
//       this.setState((prevState) => {
//         const newContact = [...prevState.contacts];
//         newContact.push({ name: name, number: number, id: generate() });
//         return { contacts: newContact };
//       });
//     }
//   };

//   handleChange = (e) => {
//     const { name, value } = e.currentTarget;
//     this.setState({
//       [name]: value,
//     });
//   };

//   filterInput = () => {
//     const { contacts, filter } = this.state;
//     const FilterLowerCase = filter.toLowerCase();
//     return contacts.filter((item) =>
//       item?.name?.toLowerCase().includes(FilterLowerCase)
//     );
//   };

//   onDelete = (idx) => {
//     this.setState(({ contacts }) => {
//       const deleteContact = contacts.filter((contact) => contact.id !== idx);
//       return { contacts: deleteContact };
//     });
//   };

//   render() {
//     const { filter } = this.state;
//     const { handleChange, addContact, filterInput, onDelete } = this;
//     const Contacts = filterInput();
//     return (
//       <div className={styles.container}>
//         <h2 className={styles.Title}>Phonebook</h2>
//         <FormMain onSubmit={addContact} />
//         <h2 className={styles.Title}>Contacts</h2>
//         <Filter onChange={handleChange} value={filter} />
//         <ContactsList list={Contacts} onDelete={onDelete} />
//       </div>
//     );
//   }
// }
