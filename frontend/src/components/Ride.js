import React from 'react';
import '../styles/FormStyles.css';
import '../styles/ride.css';
import { joinRide } from '../utils';
import { fetchRideAttendance, leaveRide, userInRide, fetchOwner } from '../utils';
import { useEffect, useState } from 'react';
import { fetchUserRides } from '../utils';
import RideAttendances from './RideAttendance'; // Import the RideAttendances component
import { Route, useNavigate } from 'react-router-dom';
import RateRider  from './RateRider';



const RideComponent = ({ ride, onSelectRide }) => {
  const { city, estimatedDuration,createdAt, description, id, maxAttendance, date, time, startLocation, title, updatedAt } = ride;
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
    <div>
      <div className="red-background">
        <div className='black-background white'>
          <div className ='title-section'>
          <h1>{title}</h1>
          <p >{city}</p>
          <p>{startLocation}</p>
          </div>
        </div>
      </div>
      <div className="ride-details-info">
      <div className="ride-details-info-item black-background">
        <span className = "redBox"></span>
        <span className="ride-details-info-label white">Date:</span>
        <span className="ride-details-info-value white">{ride.date}</span>
      </div>
      <div className="ride-details-info-item black-background">
        <span className = "redBox"></span>
        <span className="ride-details-info-label white">Time:</span>
        <span className="ride-details-info-value white">{ride.time}</span>
      </div>
      <div className="ride-details-info-item black-background">
        <span className = "redBox"></span>
        <span className="ride-details-info-label white">Est. duration:</span>
        <span className="ride-details-info-value margin-smaller white">{ride.estimatedDuration}</span>
      </div>
      <div className ="ride-details-info-item description">
        <span className = "emptyBox"></span>
        <span className="ride-details-info-label">Description:</span>
        <span className="ride-details-info-value">{ride.description}</span>
      </div>
      <div className ="ride-details-info-item">
        <span className = "emptyBox"></span>
        <span className="ride-details-info-label">Attendances:</span>
        <span className="ride-details-info-value">{attendance !== null ? `${attendance}/${maxAttendance}` : 'Loading...'}</span>
      </div>
      <div className ="ride-details-info-item">
        <span className = "emptyBox"></span>
        <RideAttendances rideId={id}/>
      </div>
      <button className="form-button down" onClick={handleSelectRide}>
        {userInRide === true ? "Leave Ride" : "Join Ride"}
      </button>
      {userIsOwner ? <button onClick={onClick} className="form-button">
        Edit Ride
      </button> : ""}
    </div>
  </div>
  );
};

export default RideComponent;