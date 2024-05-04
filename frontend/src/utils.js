import env from "react-dotenv";
import axios from 'axios'; // Import the axios library

export const fetchOwner = async (rideID, token) => {
  try{
    const response = await axios.post(`${env.BASE_URL}/is-owner`, {rideID: rideID} , { headers: { Authorization: `Bearer ${token}`}});
    return response.data.isOwner;
  } catch (error){
    console.error('Error checking if user is owner of ride.', error);
    return false;
  }
}

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
      throw new Error('Error fetching attendance');
  }
  return data;
  }catch(error){
      console.error('Error fetching attendance:', error);
      throw error;
  }   

};

export const fetchUserInRide = async (rideID) => {
  try{
  const response = await fetch(`${env.BASE_URL}/rides/${rideID}/users`);
  console.log(response);
  const data = await response.json();
  if(!response.ok){
      throw new Error('Error fetching users in ride');
  }
  return data;
  }catch(error){
      console.error('Error fetching users in ride:', error);
      throw error;
  }   

};

export const rateRide = async (rideID) => {
  try{
    const token = localStorage.getItem('token');
    const response = await fetch(`${env.BASE_URL}/rides/${rideID}/rate`, {// Need to change route to use token.
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    });
  console.log(response);
  const data = await response.json();
  if(!response.ok){
      throw new Error('Error rating ride');
  }
  return data;
  }catch(error){
      console.error('Error fetching users in ride:', error);
      throw error;
  }   

};