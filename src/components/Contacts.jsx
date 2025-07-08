import { useState } from "react"
import { v4 } from "uuid";

import ContactsList from "./ContactsList";

import styles from "./Contacts.module.css"

function Contacts() {

  const [contacts, setContacts] = useState([])
  const [alert, setAlert] = useState("")
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact((contact) => ({...contact, [name]: value}))

  }

  const addHandler = () => {

    if (!contact.name || !contact.lastName || !contact.email || !contact.phone) {
      setAlert("Please Enter Valid Data!")
      
      return;
    }

    setAlert("")

    if (isEditMode) {
      const updatedContacts = contacts.map(c =>
        c.id === editId ? { ...contact, id: editId } : c
      );
      setContacts(updatedContacts);
      setIsEditMode(false);
      setEditId(null);
    } else {
      const newContact = { ...contact, id: v4() };
      setContacts((contacts) => [...contacts, newContact]);
    }

    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });

  }

  const deleteHandler = (id) => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  }

  const editHandler = (id) => {
    const selected = contacts.find(contact => contact.id === id);
    setContact(selected);
    setIsEditMode(true);
    setEditId(id);
  };

  const filteredContacts = contacts.filter(c =>
    `${c.name} ${c.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const deleteSelected = () => {
    const newContacts = contacts.filter(c => !selectedIds.includes(c.id));
    setContacts(newContacts);
    setSelectedIds([]);
  };

  return (
    <div className={styles.container}>
        <div className={styles.form}>
            <input type="text" placeholder="Name" name="name" value={contact.name} onChange={changeHandler} />
            <input type="text" placeholder="Last Name" name="lastName" value={contact.lastName} onChange={changeHandler} />
            <input type="email" placeholder="Email" name="email" value={contact.email} onChange={changeHandler} />
            <input type="number" placeholder="Phone" name="phone" value={contact.phone} onChange={changeHandler} />
            <button onClick={addHandler}>{isEditMode ? "Update Contact" : "Add Contact"}</button>
        </div>
        <div className={styles.alert}>
          {alert && <p>{alert}</p>}
        </div>
        <div className={styles.search}>
            <input type="text" placeholder="Search by name or last name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <button onClick={() => {setIsSelectMode(!isSelectMode); setSelectedIds([]);}} className={styles.selectToggle}>
          {isSelectMode ? "❌ Cancel Select" : "✅ Select"}
        </button>
        <ContactsList contacts={filteredContacts} deleteHandler={deleteHandler} editHandler={editHandler} toggleSelect={toggleSelect} selectedIds={selectedIds} isSelectMode={isSelectMode} />
        {isSelectMode && (
          <div className={styles.bulkActions}>
            <button
              onClick={() => {
                const allIds = filteredContacts.map((c) => c.id);
                setSelectedIds(allIds);
              }}
            >
              Select All
            </button>

            {selectedIds.length > 0 && (
              <button onClick={deleteSelected}>🗑 Delete Selected ({selectedIds.length})</button>
            )}
          </div>
        )}
    </div>
  )
}

export default Contacts