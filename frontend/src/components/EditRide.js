import axios from "axios";
import { useState, useEffect } from "react";
import '../styles/FormStyles.css';
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom';




export default function EditRide() {
    const navigate = useNavigate();
    //console.log(localStorage.getItem('ride-edit'));
    
    useEffect(() => {
            async function isLoggedIn(){
                const token = localStorage.getItem('token');
                await axios.get(`${env.BASE_URL}/is-logged-in`, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                })
                .then(function (response){
                    if(response.status === 200){
                        if(localStorage.getItem("ride-edit") !== null){
                            const ride = JSON.parse(localStorage.getItem("ride-edit"));
                    
                            console.log(ride.date);
                    
                            // Need to convert date to correct format
                            const date = new Date(ride.date).toISOString();
                            let newDate = date.slice(0, date.indexOf('T'));
                            ride.date = newDate;
                            setInput(ride);
                            
                        }
                    }
                }).catch(function (error){
                    localStorage.setItem('error', error.response.data +" " + error.response.status);
                    navigate('/err');
                });
                console.log("hi");

            }
        isLoggedIn();
      }, []);
    
    

    const [input, setInput] = useState({
        title: "",
        date: "",
        time: "",
        estimatedDuration: "",
        city: "",
        startLocation: "",
        description: "",
        maxAttendance: "",
    });

    
    


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        axios.post(`${env.BASE_URL}/edit-ride`, input)
            .then(function (response) {
                if(response.status === 200){
                    alert("Ride Edited!");
                    localStorage.removeItem('ride-edit');
                    navigate('/');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    

    return (
        <>
            <div className="form-wrapper">
                <div className="background"></div>
                <h2>{input.title}</h2>
                <h4>{input.city}</h4>
                <form onSubmit={handleSubmit} className="form-container">
                    <label htmlFor="date">Date:</label>
                        <input
                            value={input.date}
                            onChange={handleChange}
                            type="date"
                            id="date"
                            className="form-input"
                            required
                        />
                        <label htmlFor="time">Time:</label>
                        <input
                            value={input.time}
                            onChange={handleChange}
                            type="time"
                            id="time"
                            className="form-input"
                            required
                        />
                        <label htmlFor="estimatedDuration">Estimated duration:</label>
                        <input
                            value={input.estimatedDuration}
                            onChange={handleChange}
                            type="number"
                            id="estimatedDuration"
                            className="form-input"
                            required
                        />
                        <label htmlFor="startLocation">Start location:</label>
                        <input 
                            value={input.startLocation}
                            onChange={handleChange}
                            type="text"
                            id="startLocation"
                            className="form-input"
                            required
                        />
                        <label htmlFor="description">Description:</label>
                        <textarea
                            value={input.description}
                            onChange={handleChange}
                            id="description"
                            className="form-input"
                        />
                        <label htmlFor="time">Maximum no. of attendees:</label>
                        <input
                            value={input.maxAttendance}
                            onChange={handleChange} 
                            type="number" 
                            id="maxAttendance"
                            className="form-input"
                        />
                    <input type="submit" value="UPDATE" className="confirm-button"></input>
                </form>
                <button onClick={() => {navigate('/rides')}} className="secondary-button">Cancel</button>
            </div>
        </>
    ); 
}