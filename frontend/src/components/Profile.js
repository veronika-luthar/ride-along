import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from 'react-dotenv';
import Review from './Review';
import '../styles/Profile.css'; // Import CSS file for styling

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
    };

    const getReviews = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${env.BASE_URL}/get_user/ratings/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(response.data.result);
    };

    getUserProfile();
    getReviews();
  }, []);

  return (
    <div className="profile-container">
      <h2>{userProfile.name}'s Profile</h2>
      <div className="profile-item">
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
      <br></br>
      <br></br>
      <h3>Reviews</h3>
      <div className="reviews-container">
        {/* Map through reviews and render Review component for each */}
        {reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
