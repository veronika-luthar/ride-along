const BASE_URL = 'http://localhost:3000'; 


export const fetchRides = async () => {
  try {
    const response = await fetch(`${BASE_URL}/rides`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching rides:', error);
    throw error;
  }
};

export const fetchRidesByCity = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}/rides/${city}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching rides by city:', error);
    throw error;
  }
};

export const joinRides = async (rideID, userID) => {
    try {
      const response = await fetch(`${BASE_URL}/rides/${city}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching rides by city:', error);
      throw error;
    }
  };
