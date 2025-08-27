import React from 'react';
import './ContactItem.css';

const ContactItem = ({ contact, onDelete }) => {
  return (
    <div className="contact-card">
      <div className="contact-info">
        <span className="contact-name">{contact.name}</span>
        <span className="contact-phone">
          <i className="fas fa-phone"></i>
          {contact.phone}
        </span>
      </div>
      <div className="contact-actions">
        <button 
          className="btn btn-delete"
          onClick={() => onDelete(contact.id)}
          title="Delete contact"
        >
          <p>delete</p>
        </button>
      </div>
    </div>
  );
};

export default ContactItem;