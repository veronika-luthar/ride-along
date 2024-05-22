import React from 'react';

const Stars = ({ rating }) => {
  const maxRating = 1; // Adjust the maximum rating as needed

  const getStarIcon = (index) => {
      return '☆'; // Empty star
  };

  return (
    <div style={{ display: 'inline' }}>
      {[...Array(maxRating)].map((_, index) => (
        <span key={index}>{getStarIcon(index)}{parseFloat(rating).toFixed(2)}</span>
      ))}
    </div>
  );
};

export default Stars;