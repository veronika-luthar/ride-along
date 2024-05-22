import React from 'react';
import '../styles/RidePreview.css'; // Import the CSS file
import { useEffect,useState } from 'react';
const RidePreview = ({ ride, onSelectRide }) => {
  console.log(ride);
  const { city, createdAt, description, id, maxAttendance, date, time, startLocation, title, updatedAt } = ride;
  const formattedScheduledTime = `${time}`;
  const [showRateRideButton,setShowRateRide] = useState(false);


  useEffect(() => {

    const shouldShowRateRide =  async () => { 
        const currentTime = new Date();
        const date1 = new Date(date)
        const [hours, minutes] = time.split(':');
        const rideTime = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(), hours, minutes);
        console.log(time + ' current:' + rideTime);
        if (rideTime < currentTime) {
          setShowRateRide(true);
        }
    }
    shouldShowRateRide()
    })


    const rateRideClicked = () => {
        console.log('Rate ride clicked');
        onSelectRide(ride);
    }

  return (
    <div className="ride-preview">
      <div className="ride-preview-header">
        <div>
          <p className="ride-preview-title">{ride.title}</p>
          <p className="ride-preview-city">{ride.city}</p>
        </div>
        {showRateRideButton && (
        <div>
        <button className="form-button" onClick={rateRideClicked}>
        Rate Ride!!
        </button>
        </div>
        )}
        {!showRateRideButton && (
        <div className="ride-preview-date-time">
          <p>{ride.date}</p>
          <p>{formattedScheduledTime}</p>
        </div>
        )}
      </div>
      <p className="ride-preview-description">{ride.description}</p>
    </div>
  );
};
/*
      {showRateRideButton && (
        <div>
        <button className="form-button" onClick={rateRideClicked}>
        </button>
        </div>
*/

export default RidePreview;