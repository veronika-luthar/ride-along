import RideComponent from './Ride';
import React, { useState, useEffect } from 'react';
import { fetchRides } from '../backendAPI';
import '../styles/FormStyles.css'; // Import the CSS file for styling
import '../styles/ride.css'; // Import the CSS file for styling





const RideList = ({ onSelectRide }) => {
    const [rides, setRides] = useState([]);
  
    useEffect(() => {
      const getRides = async () => {
        try {
          const data = await fetchRides();
          setRides(data);
        } catch (error) {
          console.error('Error fetching rides:', error);
        }
      };
  
      getRides();
    }, []);

    useEffect(() => {
        fetchRides();
      }, []);

    
  return (
    <div>
    <h1 className = "form-title" >Available Rides</h1>
        <div className="ride-list">
        {rides.map((ride,index) => (
            <div key={ride.id} className={`ride-item ${(index + 1) % 3 === 0 ? 'last-in-row' : ''}`}>
            <RideComponent ride={ride} onSelectRide={onSelectRide} />
        </div>
        ))}
        </div>
    </div>
  );
};

export default RideList;