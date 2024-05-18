import React from 'react';
import '../styles/FormStyles.css';
import { joinRide } from '../utils';
import { fetchRideAttendance, leaveRide, userInRide, fetchOwner } from '../utils';
import { useEffect, useState } from 'react';
import { fetchUserRides } from '../utils';
import RideAttendances from './RideAttendance'; // Import the RideAttendances component
import { Route, useNavigate } from 'react-router-dom';
import RateRider  from './RateRider';



const RideComponent = ({ ride, onSelectRide }) => {
  const { city, createdAt, description, id, maxAttendance, date, time, startLocation, title, updatedAt } = ride;
  const [attendance, setAttendance] = useState(null);
  const [userInRide, setUserInRide] = useState(false);
  const [showAttendancePopup, setShowAttendancePopup] = useState(false);
  const [showRateRideButton, setRateRidePopUp] = useState(false);
  const navigate = useNavigate();
  const [userIsOwner, setUserIsOwner] = useState(false);

  const fetchAttendance = async () => {
    const response = await fetchRideAttendance(id);
    setAttendance(response);
  };

  const fetchUserInRide = async () => {
    const response = await fetchUserRides(id);
    if (response.some(r => r.id === ride.id)) {
      setUserInRide(true);
    } else {
      setUserInRide(false);
    }
  };

  useEffect(() => {
    fetchUserInRide();
    fetchAttendance();
    isUserOwner();
  }, [ride.id]);

  const formattedScheduledTime = `${new Date(date).toLocaleString().split(',')[0]}, ${time}`;

  const handleSelectRide = async () => {
    if (userInRide === true) {
      await leaveRide(id);
    } else {
      await joinRide(id);
    }
    fetchAttendance(); // Refetch attendance data after joining or leaving the ride
  };

  const toggleAttendancePopup = () => {
    setShowAttendancePopup(!showAttendancePopup);
  };

 const toggleRateRidePopup = () => {
      setRateRidePopUp(!showRateRideButton);
  };

  function onClick(){
    localStorage.setItem('ride-edit', JSON.stringify(ride));
    navigate('/edit-ride');
  }

  async function isUserOwner(){
    if(localStorage.getItem('token') !== null && localStorage.getItem('token') !== ""){
      const res = await fetchOwner(ride.id, localStorage.getItem('token'));
      console.log(res);
      setUserIsOwner(res);
    }
  }

  return (
    <div className="form-container">
      <h3 className="form-title">{title}</h3>
      <p>City: {city}</p>
      <p>Description: {description}</p>
      <p>Start Location: {startLocation}</p>
      <p>Scheduled Time: {formattedScheduledTime}</p>
      <p>Attendance: {attendance !== null ? `${attendance}/${maxAttendance}` : 'Loading...'}</p>
      <button className="form-button" onClick={handleSelectRide}>
        {userInRide === true ? "Leave Ride" : "Join Ride"}
      </button>
      <button className="form-button" onClick={toggleAttendancePopup}>
        View Attendance
      </button>
      <button className="form-button" onClick={toggleRateRidePopup}>
        Rate Ride
      </button>
      {userIsOwner ? <button onClick={onClick} className="form-button">
        Edit Ride
      </button> : ""}
      {showAttendancePopup && (
        <div className="attendance-popup">
          <div className="attendance-popup-content">
            <RideAttendances rideId={id} rideName= {title} />
            <button className="form-button" onClick={toggleAttendancePopup}>
              Close
            </button>
          </div>
        </div>
      )}
      {showRateRideButton && (
        <div className="attendance-popup">
          <div className="attendance-popup-content">
            <RateRider rideID={id}/>
            <button className="form-button" onClick={toggleRateRidePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideComponent;