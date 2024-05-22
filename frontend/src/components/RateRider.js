import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RateRider.css';
import env from "react-dotenv";
import axios from "axios";
import { useParams } from 'react-router-dom';

const RateRider = () => {
  const { rideID } = useParams();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (index) => {
    setRating(index + 1);
  };

  const handleMouseEnter = (index) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get('comment');

    console.log('Form submitted!');
    console.log(rideID);
    console.log(`${env.BASE_URL}/rides/${rideID}/rate`);
    console.log('Comment:', comment);
    console.log('Rating:', rating);

    const ratingData = {
      rating,
      comment,
    };

    const token = localStorage.getItem('token');
    axios.post(`${env.BASE_URL}/rides/${rideID}/rate`, ratingData, { headers: { Authorization: `Bearer ${token}`}})
        .then(function (response) {
            if(response.status === 200){
              alert(`You rated the rider ${rating} stars!`);
              navigate('/rides')            }
        })
        .catch(function (error) {
              console.error(error);
            }
        );    

  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Rate your most recent ride!</h2>
      <p>This will be added to your fellow riders' personal average rating</p>
      <div className="stars form-input">
        {[...Array(5)].map((_, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              id={`star${index}`}
              name="rating"
              value={index + 1}
              checked={rating === index + 1}
              onChange={() => handleChange(index)}
            />
            <label
              htmlFor={`star${index}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{
                color: (hoverRating || rating) > index ? '#ff4d4f' : '#ccc'
              }}
            ></label>
          </React.Fragment>
        ))}
      </div>
      <label>
        Comment
        <textarea className="comment form-input" name="comment" />
      </label>
      <input type="submit" value="Confirm" className="form-button" />
      <button type="button" className="cancel-button" onClick={() => window.history.back()}>Cancel</button>
    </form>
  );
};

export default RateRider;