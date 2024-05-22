// RegisterForm.js
import axios from 'axios';
import React, { useState } from 'react';
import '../styles/FormStyles.css';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import PhoneInput from 'react-phone-input-2';
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
      })
      .then(function (response){
        if(response.status === 200){
          setFormData({
            name: response.data.name,
            email: response.data.email,
            phoneNumber: response.data.phone_number,
            isPublic: response.data.public,
          });
          console.log(formData.isPublic);
        }
      }).catch(function (error){
          localStorage.setItem('error', error.response.data +" " + error.response.status);
          navigate('/err');
      });;
      
    }
    getUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
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
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className='form-title'>Update your details</h2>
        <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=""
            className="form-input"
          />
        <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=""
            className="form-input"
          />
        <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=""
            className="form-input"
          />
          <div className="form-group">
            <label className="form-label">Phone Number:</label>
            <PhoneInput
              country={'us'}
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              inputClass="form-input"
              containerClass="phone-input-container"
              buttonClass="phone-input-button"
              dropdownClass="phone-input-dropdown"
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
        <button type="submit" className="confirm-button">CONFIRM</button>
      </form>
    </div>
  );
};

export default RegisterForm;
