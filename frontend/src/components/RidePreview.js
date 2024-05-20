import React from 'react';
import '../styles/RidePreview.css'; // Import the CSS file

const RidePreview = ({ ride, onSelectRide }) => {
  console.log(ride);
  const { city, createdAt, description, id, maxAttendance, date, time, startLocation, title, updatedAt } = ride;
  const formattedScheduledTime = `${time}`;

  return (
    <div className="ride-preview">
      <div className="ride-preview-header">
        <div>
          <p className="ride-preview-title">{ride.title}</p>
          <p className="ride-preview-city">{ride.city}</p>
        </div>
        <div className="ride-preview-date-time">
          <p>{ride.date}</p>
          <p>{formattedScheduledTime}</p>
        </div>
      </div>
      <p className="ride-preview-description">{ride.description}</p>
    </div>
  );
};

export default RidePreview;