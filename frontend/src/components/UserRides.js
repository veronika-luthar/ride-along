import RideComponent from './Ride';
import React, { useState, useEffect } from 'react';
import { fetchUserRides, fetchCities } from '../utils';
import '../styles/FormStyles.css';
import '../styles/ride.css';
import ErrorBoundary from './ErrorBoundary';

const RideList = ({ onSelectRide }) => {
  const [rides, setRides] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const getRides = async () => {
      try {
        const data = await fetchUserRides();
        if(data == null ){
            setRides([]);
        }else{
        setRides(data);
        }
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    const getCities = async () => {
      try {
        const data = await fetchCities();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    getRides();
    getCities();
  }, []);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const filteredRides = selectedCity
    ? rides.filter((ride) => ride.city === selectedCity)
    : rides;

  return (
    <ErrorBoundary>
        <div>
        <h1 className="form-title">Available Rides</h1>
        <div className='form-group'>
            <select className="form-container" id="cityFilter" value={selectedCity} onChange={handleCityChange}>
            <option value="">All Cities</option>
            {cities.map((city) => (
                <option key={city} value={city}>
                {city}
                </option>
            ))}
            </select>
        </div>
        <div className="ride-list">
            {filteredRides.map((ride, index) => (
            <div key={ride.id} className={`ride-item ${(index + 1) % 3 === 0 ? 'last-in-row' : ''}`}>
                <RideComponent ride={ride} onSelectRide={onSelectRide} />
            </div>
            ))}
        </div>
        </div>
    </ErrorBoundary>
  );
};

export default RideList;