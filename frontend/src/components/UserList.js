import React, { useState, useEffect } from 'react';
import { fetchRides, fetchCities } from '../utils';
import RidePreview from './RidePreview';
import '../styles/FormStyles.css';
import '../styles/ride.css';
import RideAttendances from './RideAttendance';
import GlassmorphismPopup from './GlassMorphPop';
import Ride from './Ride';
import { fetchRideAttendance, leaveRide, fetchOwner,fetchUserRides } from '../utils';

const UserList = ({ onSelectRide }) => {
    const [rides, setRides] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedRide, setSelectedRide] = useState(null);
    const [pastRides, setPastRides] = useState([]);
    const [currentRides, setCurrentRides] = useState([]);
    const [ownedRides, setOwnedRides] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
  
    useEffect(() => {
      const getRides = async () => {
        try {
          const data = await fetchUserRides();
          console.log(data);
          await setRidesAsync(data);
        } catch (error) {
          console.error('Error fetching rides:', error);
        }
      };
    
      getRides();
    }, []);
    
    useEffect(() => {
      const sortAndSetRides = async () => {
        await sortRides();
        console.log(pastRides);
      };
    
      sortAndSetRides();
    }, [rides]);
  
    const setRidesAsync = async (data) => {
      setRides(data);
    };
    const sortRides = async () => {
      const sortedPastRides = [];
      const sortedCurrentRides = [];
      const sortedOwnedRides = [];

      for (const ride of rides) {
        if (await rideCompleted(ride)) {
          sortedPastRides.push(ride);
          continue;
        }
        if(await ownerOfRide(ride)){
          sortedOwnedRides.push(ride);
          continue;
        }
        sortedCurrentRides.push(ride);
      }
      setPastRides(sortedPastRides);
      setCurrentRides(sortedCurrentRides);
      setOwnedRides(sortedOwnedRides);
    };

    
  const rideCompleted =  async (ride) => { 
    const currentTime = new Date();
    const [hours, minutes] = ride.time.split(':');
    const rideDate = new Date(ride.date);
    const rideTime = new Date(rideDate.getFullYear(), rideDate.getMonth(), rideDate.getDate(), hours, minutes);
    if (rideTime < currentTime) {
      return true;
    }
    return false
  }
const ownerOfRide = async (ride) => {
  if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== "") {
    const response = await fetchOwner(ride.id, localStorage.getItem('token'));
    if (response === true) {
        return true
    } else {
      return false
    }
  }
}


const handleRideClick = (ride) => {
  setSelectedRide(ride);
  setShowPopup(true);
};

const handleClosePopup = () => {
  setShowPopup(false);
};
  
    return (
      <div className="my-rides-container">
          <h1 className="form-title">Completed Rides</h1>
            <div className="ride-list">
              {pastRides.map((ride, index) => (
                <div
                  key={ride.id}
                  className="ride-item"
                  onClick={() => handleRideClick(ride)}
                >
                  <RidePreview ride={ride} userInRide={true}  />
                </div>
              ))}
            </div>
            <h1 className="form-title">Owned Rides</h1>
            <div className="ride-list">
              {ownedRides.map((ride, index) => (
                <div
                  key={ride.id}
                  className="ride-item"
                  onClick={() => handleRideClick(ride)}
                >
                  <RidePreview ride={ride} userInRide={true}  />
                </div>
              ))}
            </div>
            <h1 className="form-title">Joined Rides</h1>
            <div className="ride-list">
              {currentRides.map((ride, index) => (
                <div
                  key={ride.id}
                  className="ride-item"
                  onClick={() => handleRideClick(ride)}
                >
                  <RidePreview ride={ride} userInRide={true}  />
                </div>
              ))}
            </div>
        {showPopup && (
        <GlassmorphismPopup ride={selectedRide} onClose={handleClosePopup} />
      )}
      </div>
    );
  };
/*

        <div className={`ride-details-container full-height ${selectedRide ? 'cover-grey' : ''}`}>
          {selectedRide && ( <Ride ride={selectedRide} />
          )}
        </div>*/

export default UserList;