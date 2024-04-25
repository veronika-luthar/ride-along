// RegisterForm.js
import axios from 'axios';
import React, { useState } from 'react';
import '../styles/FormStyles.css';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import env from "react-dotenv";
import { useEffect } from 'react';


const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    isPublic: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${env.BASE_URL}/get_user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({
        name: response.data.name,
        email: response.data.email,
        phoneNumber: response.data.phone_number,
        isPublic: response.data.public,
      });
      console.log(formData.isPublic);
    }

    getUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.post(`${env.BASE_URL}/edit_profile`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        },
      });      
      if (response.status === 200) {
        alert('Profile edited successfully');
        navigate('/'); // Redirect to the landing page
      }
    } catch (error) {
      if(error.response.status === 401) {
        setErrorMessage('Incorrect Password')      
      }
      console.error('Error Editing Profile:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Profile</h2>
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
          {formData.isPublic ? (<input 
            type="checkbox" 
            name="isPublic" 
            onChange={handleChange} 
            className="form-checkbox"
            checked
          />)
          : (<input 
            type="checkbox" 
            name="isPublic" 
            onChange={handleChange} 
            className="form-checkbox"/>
            )
          }
          <span className="form-checkbox-label">Make my account public</span>
        </div>
        <div className="form-group">
          <label className="form-label">Enter your Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="form-input" 
            required 
          />
        </div>
        <button type="submit" className="form-button">Edit Profile</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default RegisterForm;
