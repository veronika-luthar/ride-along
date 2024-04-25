import React from 'react';
import '../styles/Landing.css'; // Import the CSS file for styling
import RideList from './RideList';

const Landing = () => {

  function signOut() {
    localStorage.setItem('token', '');
    window.location.reload();
  }

  return (
    <div className="landing-container">
      <h1>Welcome to Ride Along</h1>
      <div className="button-container">
        {localStorage.getItem('token') === '' ? (
          <div>
            <a href="/login" className="action-button">Login</a>
            <a href="/register" className="action-button">Register</a>
          </div>
        ) : (
          <div>
          <a href="/profile" className="action-button">Go to profile</a>
          <button className="sign-out-button" onClick={signOut}>Sign Out</button>
          <a href="/user-rides" className="action-link">View Your Rides</a>
          <a href="/create-ride" className="action-link">Create a Ride</a>
          </div>
          )}
      </div>
      <RideList/>
    </div>
  );
}

export default Landing;
