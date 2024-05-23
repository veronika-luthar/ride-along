import React from 'react';
import Stars from './Stars';

const UserRating = (stars) => {
  return (
    <div>
      <Stars rating={stars} />
    </div>
  );
};

export default UserRating;