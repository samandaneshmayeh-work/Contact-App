import styles from "./ContactsList.module.css";

function ContactsList({ contacts, deleteHandler, editHandler, toggleSelect, selectedIds, isSelectMode }) {



  return (
    <div className={styles.container}>
      <h3>Contacts List</h3>
      {
        contacts.length ? (
          <ul className={styles.contacts}>
            {contacts.map((contact) => <li key={contact.id} className={styles.item}>
                {isSelectMode && (
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(contact.id)}
                    onChange={() => toggleSelect(contact.id)}
                  />
                )}
                <p>{contact.name} {contact.lastName}</p>
                <p><span>📧</span>{contact.email}</p>
                <p><span>📞</span>{contact.phone}</p>
                  {!isSelectMode && (
                    <>
                      <button onClick={() => editHandler(contact.id)}>✏️</button>
                      <button onClick={() => deleteHandler(contact.id)}>🗑️</button>
                    </>
                  )}
              </li>)}
          </ul>
        ) : (
          <p className={styles.message}>No Contacts Yet!</p>
        )
      }
    </div>
  )
}

export default ContactsList