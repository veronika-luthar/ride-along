import RideComponent from './Ride';
import React, { useState, useEffect } from 'react';
import { fetchRides } from '../backendAPI';
import '../styles/FormStyles.css'; // Import the CSS file for styling




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
    <div className="ride-list">
      {rides.map((ride) => (
        <RideComponent key={ride.id} ride={ride} onSelectRide={onSelectRide} />
      ))}
    </div>
  );
};

export default RideList;