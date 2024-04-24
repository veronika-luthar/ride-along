import React from 'react';
// import './LandingPage.css'; // Importing the CSS file for styling

const Landing = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>This is a cool app built with React!</p>
      <a href="/login">Login</a>
      <br />
      <a href="/register">Register</a>
      <br />
      <a href="/rides">View Rides</a> 
      <br />
      <a href="/user-rides">View User Rides</a> 
      <br />
      <a href="/create-ride">Create Ride</a>

    </div>
  );
}

export default Landing;