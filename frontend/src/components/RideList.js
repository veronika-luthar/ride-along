import React, { useState, useEffect } from 'react';
import { fetchRides, fetchCities } from '../utils';
import RidePreview from './RidePreview';
import '../styles/FormStyles.css';
import '../styles/ride.css';
import RideAttendances from './RideAttendance';
import Ride from './Ride';
import { fetchRideAttendance, leaveRide, userInRide, fetchOwner } from '../utils';


const RideListPreview = ({ onSelectRide }) => {
  const [rides, setRides] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);


  useEffect(() => {
    const getRides = async () => {
      try {
        const data = await fetchRides();
        setRides(data);
        console.log(data);
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

    const handleRideClick = (ride) => {
      setSelectedRide(ride);
    };

  
    return (
      <div className="photo">
      <div className="ride-list-preview">
        <div className="ride-list-container cover full-height">
          <h1 className="form-title">Browse rides</h1>
          <div className="form-group">
            <span className="cityFilter">Filter by:   </span>
            <select
              className="cityFilterSelect"
              id="cityFilterSelect"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">All cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="ride-list">
            {filteredRides.map((ride, index) => (
              <div
                key={ride.id}
                className="ride-item"
                onClick={() => handleRideClick(ride)}
              >
                <RidePreview ride={ride} />
              </div>
            ))}
          </div>
        </div>
        <div className={`ride-details-container full-height ${selectedRide ? 'cover-grey' : ''}`}>
          {selectedRide && ( <Ride ride={selectedRide} />
          )}
        </div>
      </div>
      <a href="/create-ride" class="circular-button">
        <span class="cross"></span>
      </a>
      </div>
    );
  };

export default RideListPreview;