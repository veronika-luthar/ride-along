// RegisterForm.js
import axios from 'axios';
import React, { useState } from 'react';
import '../styles/FormStyles.css';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import env from "react-dotenv";


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
      console.log(`${env.BASE_URL}/register`);
      console.log("REGISTRANDO");
      const response = await axios.post(`${env.BASE_URL}/register`, formData);
      console.log("DATA");
      console.log(response.data); // Handle response from the server
      if (response.status === 201) {
        alert('Registered successfully');
        navigate('/login'); // Redirect to the login page
      }
    } catch (error) {
      console.log("ERROR");
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
