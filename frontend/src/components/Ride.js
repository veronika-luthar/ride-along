import React from 'react';
import '../styles/FormStyles.css'; // Import the CSS file for styling
import {joinRide} from '../backendAPI';

const RideComponent = ({ ride, onSelectRide }) => {
  const {
    attendance,
    city,
    createdAt,
    description,
    id,
    max_attendance,
    scheduled_time,
    start_location,
    title,
    updatedAt,
  } = ride;

  const formattedScheduledTime = new Date(scheduled_time).toLocaleString();


  const handleSelectRide = async () => {
    const response = await joinRide(id);
  };




  return (
    <div className="form-container">
      <h3 className = "form-title" >{title}</h3>
      <p>City: {city}</p>
      <p>Description: {description}</p>
      <p>Start Location: {start_location}</p>
      <p>Scheduled Time: {formattedScheduledTime}</p>
      <p>Attendance: {attendance}/{max_attendance}</p>
      <button className = "form-button"onClick={handleSelectRide}>Join Ride</button>
    </div>
  );
};

export default RideComponent;