import { useEffect, useState } from 'react';
import React from 'react';
import '../styles/FormStyles.css';
import '../styles/Attendee.css';
import Stars from './Stars';

import { fetchUserInRide } from '../utils';

const RideAttendances = ({ rideId,rideName}) => {
  const [attendance, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersOnRide = async () => {
      const data = await fetchUserInRide(rideId);
      console.log(data);
      setUsers(data[0]);
    };
    fetchUsersOnRide();
  }, [rideId]);

  const owner = attendance.find((user) => user.isOwner);
  const attendees = attendance.filter((user) => !user.isOwner);

  return (
    <div>
      {owner && (
        <div className="ride-details-info-itema">
          <span className="ride-details-info-labela">Owner:</span>
          <div className="ride-details-info-value-wrappera">
            <span className="ride-details-info-valuea">{owner.name}  {owner.rating!=null && (<Stars rating = {owner.rating}/>)}</span>
            <span className="ride-details-info-valuea lightgrey"> {owner.phoneNumber && 'ph:'+owner.phoneNumber}</span>
          </div>
        </div>
      )}
      <div className="ride-details-info-itema">
        <span className="ride-details-info-labela">Other Attendees:</span>
        <div className="ride-details-info-value-wrappera">
          {attendees.map((userAttendance) => (
            <div key={userAttendance.name}>
              <span className="ride-details-info-valuea">
              {userAttendance.name}
              </span>
              <span className="ride-details-info-valuea lightgrey">{userAttendance.phoneNumber && 'ph:'+ userAttendance.phoneNumber}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );  
};

export default RideAttendances;