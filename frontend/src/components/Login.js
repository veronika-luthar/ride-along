import React, { useState } from 'react';
import axios from 'axios'; // Import the axios library
import '../styles/FormStyles.css'; // Import the CSS file for styling

const LoginForm = () => {
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
      const response = await axios.post('http://localhost:3000/login', formData);
      alert('Logged in successfully');
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
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default LoginForm;
