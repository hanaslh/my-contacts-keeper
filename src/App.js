import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Notification from './components/Notification/Notification';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem('contacts');
      if (savedContacts) {
        const parsedContacts = JSON.parse(savedContacts);
        if (Array.isArray(parsedContacts)) {
          setContacts(parsedContacts);
        }
      }
    } catch (error) {
      showNotificationWithMessage('Error loading contacts', 'error');
    }
  }, []);



  const showNotificationWithMessage = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const addContact = (contact) => {
    const phoneRegex = /^[+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(contact.phone)) {
      showNotificationWithMessage('Please enter a valid phone number', 'error');
      return;
    }
    
    const newContact = {
      id: Date.now(),
      name: contact.name,
      phone: contact.phone
    };
    
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    showNotificationWithMessage('Contact added successfully!');
  };

  const deleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      const updatedContacts = contacts.filter(contact => contact.id !== id);
      setContacts(updatedContacts);
      showNotificationWithMessage('Contact deleted successfully!');
    }
  };

  const sortContacts = (ascending) => {
    const sortedContacts = [...contacts].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      
      if (ascending) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    
    setContacts(sortedContacts);
    showNotificationWithMessage(`Contacts sorted ${ascending ? 'A-Z' : 'Z-A'}`);
  };

  return (
    <div className="container">
      <header>
        <h1>
          <i className="fas fa-address-book"></i>
          My Contacts Keeper
        </h1>
        <p className="subtitle">Manage your contacts with ease</p>
      </header>
      
      <div className="app-content">
        <ContactForm onAddContact={addContact} />
        <ContactList 
          contacts={contacts} 
          onDeleteContact={deleteContact}
          onSortContacts={sortContacts}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
      
      <Notification 
        message={notificationMessage} 
        show={showNotification} 
        type={notificationType}
      />
    </div>
  );
}

export default App;