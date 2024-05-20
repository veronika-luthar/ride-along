import React, { useState } from 'react';
import axios from 'axios'; // Import the axios library
import '../styles/FormStyles.css'; // Import the CSS file for styling
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom'; // Import useHistory


const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(env.BASE_URL);
      const response = await axios.post(`${env.BASE_URL}/login`, formData);
      alert('Logged in successfully');
      localStorage.setItem('token', response.data.token); // Store the token in the browser
      navigate('/'); // Redirect to the login page
      window.location.reload();
      console.log(response.data); // Handle response from the server
    } catch (error) {
      if(error.response.status === 401) {
        setErrorMessage('Invalid credentials');
        return;
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="form-button">Login</button>
      </form>
      <div className="form-group">
        <br></br>
        <a href="/register" className="form-label">Don't have an account? Register</a>
      </div>  
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default LoginForm;
