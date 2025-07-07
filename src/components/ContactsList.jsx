import styles from "./ContactsList.module.css";

function ContactsList({ contacts, deleteHandler }) {



  return (
    <div className={styles.container}>
      <h3>Contacts List</h3>
      {
        contacts.length ? (
          <ul className={styles.contact}>
            {contacts.map((contact) => <li key={contact.id} className={styles.item}>
                <p>{contact.name} {contact.lastName}</p>
                <p><span>📧</span>{contact.email}</p>
                <p><span>📞</span>{contact.phone}</p>
                <button onClick={() => deleteHandler(contact.id)}>🗑️</button>
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