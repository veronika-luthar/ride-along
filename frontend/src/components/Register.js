// RegisterForm.js
import axios from 'axios';
import React, { useState } from 'react';
import '../styles/FormStyles.css';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useHistory


const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    isPublic: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      console.log(response.data); // Handle response from the server
      if (response.status === 200) {
        alert('Registered successfully');
        navigate('/login'); // Redirect to the login page
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="form-input" 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="form-input" 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="form-input" 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number:</label>
          <input 
            type="tel" 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
            className="form-input" 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="checkbox" 
            name="isPublic" 
            checked={formData.isPublic} 
            onChange={handleChange} 
            className="form-checkbox" 
          />
          <span className="form-checkbox-label">Make my account public</span>
        </div>
        <button type="submit" className="form-button">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
