export const BASE_URL = 'http://localhost:3000'; 


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

export const fetchCities = async () => {
    try{
    const response = await fetch(`${BASE_URL}/cities`);
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


export const joinRide = async (rideID, userID) => {
    try {
        const response = await fetch(`${BASE_URL}/rides/${rideID}/join?userID=${userID}`, {
        method: 'POST',
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

