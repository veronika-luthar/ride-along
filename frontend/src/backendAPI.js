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

export const joinRide = async (rideID, userID) => {
    try {
        const response = await fetch(`${BASE_URL}/rides/${rideID}/join?userID=${userID}`, {
        method: 'POST',
        });
        console.log(response)
        if (!response.ok) {
            if(response.status === 404) {
                throw new Error('Ride not found');
            }
            if(response.status === 400) {
                alert("No more space in ride");
                return;
            }
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error joining ride:', error);
        throw error;
    }
};

