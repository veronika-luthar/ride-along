import React from 'react';

const Stars = ({ rating }) => {
  const maxRating = 5; // Adjust the maximum rating as needed

  const getStarIcon = (index) => {
    if (index < rating) {
      return '★'; // Filled star
    } else {
      return '☆'; // Empty star
    }
  };

  return (
    <div style={{ display: 'inline' }}>
      {[...Array(maxRating)].map((_, index) => (
        <span key={index}>{getStarIcon(index)}</span>
      ))}
    </div>
  );
};

export default Stars;