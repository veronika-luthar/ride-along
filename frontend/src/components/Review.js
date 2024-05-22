import React from 'react';
import '../styles/Review.css'; // Import CSS file for styling

const Review = ({ review }) => {
  return (
    <div className="review">
      <div className="rating">
        {/* Display star icons based on the rating */}
        {Array.from({ length: review.no_stars }).map((_, index) => (
          <span key={index}>&#9733;</span>
        ))}
      </div>
      <div className="comment">
        {/* Display the comment */}
        {review.comment}
      </div>
    </div>
  );
};

export default Review;
