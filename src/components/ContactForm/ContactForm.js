import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      alert('Please enter both name and phone number');
      return;
    }
    
    onAddContact({ name, phone });
    setName('');
    setPhone('');
  };
  
  return (
    <div className="contact-form">
      <h3 className="form-title">
        <i className="fas fa-user-plus"></i>
        Add New Contact
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter contact name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-plus-circle"></i>
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;