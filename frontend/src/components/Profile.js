import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Profile.css'; // Import the CSS file for styling
import axios from 'axios'; // Import the axios library
import env from "react-dotenv";
import { useState, useEffect } from 'react';
import Review from './Review';


const Profile = () => {
  
  const [userProfile, setUserProfile] = useState({});
  const [reviews, setReviews] = useState([]);

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

    const getReviews = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${env.BASE_URL}/get_user/ratings/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(response.data.result);
    }
    getUserProfile();
    getReviews();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-item">
        <strong>Username:</strong> {userProfile.name}
      </div>
      <div className="profile-item">
        <strong>Email:</strong> {userProfile.email}
      </div>
      <div className="profile-item">
        <strong>Phone Number:</strong> {userProfile.phone_number}
      </div>
      <div className="profile-item">
        <strong>Public Profile:</strong> {userProfile.public ? 'Yes' : 'No'}
      </div>

      <Link to="/edit-profile">
        <button className="edit-profile-button">Edit Profile</button>
      </Link>
      <div style={{height: "50px"}}>
        {reviews.map((review) => {
        <Review reviews={reviews} />
        })
      }
      </div>
    </div>
  );
};

export default Profile;
