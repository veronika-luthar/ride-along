import React from 'react';
import '../styles/RidePreview.css'; // Import the CSS file
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rideIsRated } from '../utils';

const RidePreview = ({ ride, userInRide=false , owner=false}) => {
  const { city, createdAt, description, id, maxAttendance, date, time, startLocation, title, updatedAt } = ride;
  const formattedScheduledTime = `${time}`;
  const [showRateRideButton,setShowRateRide] = useState(false);
  const [showRatedText,setShowRatedText] = useState(false);


  useEffect(() => {

    const shouldShowRateRide =  async () => { 
        const currentTime = new Date();
        const date1 = new Date(date);
        const [hours, minutes] = time.split(':');
        const rideTime = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(), hours, minutes);
     //   console.log(time + ' current:' + rideTime);
        if (rideTime < currentTime && userInRide) {
            console.log(title);
            if(await rideIsRated(id)){
              console.log('Ride is rated' + title);
              setShowRatedText(true);
              setShowRateRide(true);
            }
            else{
              setShowRateRide(true);
            }
        }
    }
    shouldShowRateRide()
    })


    const navigate = useNavigate();
    const rateRideClicked = () => {
        console.log('Rate ride clicked');

        console.log(ride.id);
        navigate(`/rate-rider/${ride.id}`);
    }

    function onEditClick(){
      localStorage.setItem('ride-edit', JSON.stringify(ride));
      navigate('/edit-ride');
    }
  return (
    <div className={`ride-preview${showRateRideButton ? " black-background" : ""}`}>
    <div className={`ride-preview-header${showRateRideButton ? " white-text" : ""}`}>
      <div>
        <p className={`ride-preview-title${showRateRideButton ? " white-text" : ""}`}>{ride.title}</p>
        <p className={`ride-preview-city${showRateRideButton ? " white-text" : ""}`}>{ride.city}</p>
      </div>
      {showRateRideButton && !showRatedText && (
        <div>
          <button className="form-button" onClick={rateRideClicked}>
            Rate Ride!!
          </button>
        </div>
      )}
      {showRatedText && (
        <div>
          <p className="white-text">Rated!</p>
        </div>
      
      )}
      {!showRateRideButton && owner && (
        <div>
          <button className="form-button" onClick={onEditClick}>
            Edit Ride
          </button>
        </div>
      )}
      {!showRateRideButton && !owner && (
        <div className={`ride-preview-date-time${showRateRideButton ? " white-text" : ""}`}>
          <p>{ride.date}</p>
          <p>{formattedScheduledTime}</p>
        </div>
      )}
    </div>
    <p className={`ride-preview-description${showRateRideButton ? " white-text" : ""}`}>{ride.description}</p>
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