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
    <div className="form-container">
      <h1 className="form-title">{rideName}</h1>
      <div className="form-group">
      <h3 className="form-label">Ride members</h3>
        {owner && (
          <p className="owner-info">
            <span className="owner-label">Owner:</span> {owner.name}{' '}
            {owner.phoneNumber && (
              <span className="owner-phone">{owner.phoneNumber}</span>
            )}
            <span><Stars rating = {owner.rating}/></span>
          </p>
        )}
        <ul className="attendee-list">
          {attendees.map((userAttendance) => (
            <li key={userAttendance.name} className="attendee-item">
              {userAttendance.name}{' '}
              {userAttendance.phoneNumber && (
                <span className="attendee-phone">
                    <span className="phone-separator">|</span> +{userAttendance.phoneNumber}
                </span>
                )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RideAttendances;