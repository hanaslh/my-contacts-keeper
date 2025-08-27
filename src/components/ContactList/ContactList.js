import React, { useState } from 'react';
import ContactItem from '../ContactItem/ContactItem';
import './ContactList.css';

const ContactList = ({ contacts, onDeleteContact, onSortContacts, searchTerm, onSearchChange }) => {
  const [sortAscending, setSortAscending] = useState(true);
  
  const handleSort = () => {
    const newSortOrder = !sortAscending;
    setSortAscending(newSortOrder);
    onSortContacts(newSortOrder);
  };
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );
  
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <h3>No contacts yet</h3>
        <p>Add your first contact to get started</p>
      </div>
    );
  }
  
  return (
    <div className="contacts-list">
      <div className="list-header">
        <h3 className="section-title">
          Your Contacts ({contacts.length})
        </h3>
        <button className="sort-btn" onClick={handleSort}>
          {sortAscending ? 'A-Z' : 'Z-A'}
        </button>
      </div>
      
      <div className="search-box">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      {filteredContacts.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-search"></i>
          <h3>No contacts found</h3>
          <p>Try a different search term</p>
        </div>
      ) : (
        <div className="contact-grid">
          {filteredContacts.map(contact => (
            <ContactItem 
              key={contact.id} 
              contact={contact} 
              onDelete={onDeleteContact} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;