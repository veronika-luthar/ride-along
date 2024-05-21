import axios from "axios";
import { useState } from "react";
import '../styles/FormStyles.css';
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom';


export default function EditRide() {
    const navigate = useNavigate();
    let ride = JSON.parse(localStorage.getItem('ride-edit'));

    // Need to convert date to correct format
    const date = new Date(ride.date).toISOString();
    let newDate = date.slice(0, date.indexOf('T'));
    ride.date = newDate;

    const [input, setInput] = useState(ride);


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
                <h1>{input.title}</h1>
                <h2>{input.city}</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <label htmlFor="date">Date</label>
                        <input
                            value={input.date}
                            onChange={handleChange}
                            type="date"
                            id="date"
                            className="form-input"
                            required
                        />
                        <label htmlFor="time">Time</label>
                        <input
                            value={input.time}
                            onChange={handleChange}
                            type="time"
                            id="time"
                            className="form-input"
                            required
                        />
                        <label htmlFor="estimatedDuration">Estimated duration</label>
                        <input
                            value={input.estimatedDuration}
                            onChange={handleChange}
                            type="number"
                            id="estimatedDuration"
                            className="form-input"
                            required
                        />
                        <label htmlFor="startLocation">Start location</label>
                        <input 
                            value={input.startLocation}
                            onChange={handleChange}
                            type="text"
                            id="startLocation"
                            className="form-input"
                            required
                        />
                        <label htmlFor="description">Description</label>
                        <textarea
                            value={input.description}
                            onChange={handleChange}
                            id="description"
                            className="form-input"
                        />
                        <label htmlFor="time">Maximum no. of attendees</label>
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