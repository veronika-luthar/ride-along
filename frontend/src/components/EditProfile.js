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
    <form className="update-form" onSubmit={handleSubmit}>
      <h2 className='form-title'>Update your Profile</h2>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Veronika Luthar"
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="veronika@somesemail.com"
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder=""
        />
      </label>
      <label>
        Phone no.
        <input
          type="tel"
          name="phone"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="+000000000"
        />
      </label>
      <label className="checkbox-container">
        <input
          type="checkbox"
          name="isPublic"
          checked={formData.isPublic}
          onChange={handleChange}
        />
        Make my profile public
      </label>
      <button type="submit" className="confirm-button">
        CONFIRM
      </button>
    </form>
  );
};

export default RegisterForm;
