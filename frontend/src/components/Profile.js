import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Profile.css'; // Import the CSS file for styling
import axios from 'axios'; // Import the axios library
import env from "react-dotenv";
import { useState, useEffect } from 'react';


const Profile = () => {
  
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${env.BASE_URL}/get_user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserProfile(response.data);
    }

    getUserProfile();
  }, []);

  return (
    <div className="form-container1">
      <h1 className="">{userProfile.name}</h1>
      <h4 className="">{userProfile.email}</h4>
      <Link to="/edit-profile">
        <button className="">Edit Profile</button>
      </Link>
    <div>
      <h2 className="">Reviews</h2>
    </div>
    </div>
  );
};

export default Profile;
