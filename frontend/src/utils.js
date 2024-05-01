import env from "react-dotenv";
import axios from 'axios'; // Import the axios library

export const fetchRides = async () => {
  try {
    const response = await fetch(`${env.BASE_URL}/rides`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching rides:', error);
    throw error;
  }
};

export const fetchRidesByCity = async (city) => {
  try {
    const response = await fetch(`${env.BASE_URL}/rides/${city}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching rides by city:', error);
    throw error;
  }
};

export const fetchUserRides = async (userID) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${env.BASE_URL}/user/rides/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching rides by user:', error);
    throw error;
  }
};

export const fetchCities = async () => {
    try{
    const response = await fetch(`${env.BASE_URL}/cities`);
    const data = await response.json();
    if(!response.ok){
        throw new Error('Error fetching cities');
    }
    return data;
    }catch(error){
        console.error('Error fetching cities:', error);
        throw error;
    }   

};

export const leaveRide = async (rideID, userID) => {
  try {
    const userIDTest = 1;
    const token = localStorage.getItem('token');
    const response = await fetch(`${env.BASE_URL}/rides/${rideID}/leave`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    });
    alert("Ride left succesfully");
    window.location.reload();
  }catch (error) {
    console.error('Error leaving ride:', error);
    throw error;
  }
};



export const joinRide = async (rideID) => {
    try {
      const token = localStorage.getItem('token');
        const response = await fetch(`${env.BASE_URL}/rides/${rideID}/join`, {// Need to change route to use token.
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        if(response.status === 200){
            alert("Joined ride successfully");
            window.location.reload();
            return response;
        }
        if(!response.ok){
            if(response.status === 403){
                alert("No more space in ride");
            }else{
                alert("Error joining ride");
            }
            return response
        }
        return response;
    } catch (error) {
        console.error('Error joining ride:', error);
        throw error;
    }
};


export const fetchRideAttendance = async (rideID) => {
  try{
  const response = await fetch(`${env.BASE_URL}/rides/${rideID}/attendance`);
  const data = await response.json();
  if(!response.ok){
      throw new Error('Error fetching cities');
  }
  return data;
  }catch(error){
      console.error('Error fetching cities:', error);
      throw error;
  }   

};
