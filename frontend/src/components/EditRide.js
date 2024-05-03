import axios from "axios";
import { useState } from "react";
import '../styles/FormStyles.css';
import env from "react-dotenv";
import { useNavigate, useParams } from 'react-router-dom'; // Import useHistory
import RideForm from './RideForm';


export default function EditRide() {
    const navigate = useNavigate();
    const ride = JSON.parse(localStorage.getItem('ride-edit'));
    console.log(ride);
    const [input, setInput] = useState({ ride });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        axios.post(`${env.BASE_URL}/edit-ride`, ride)
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
            <h1>{ride.title}</h1>
            <h2>{ride.city}</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    Date
                    <input
                        value={ride.date}
                        onChange={handleChange}
                        type="date"
                        id="date"
                        className="form-input"
                        required
                    />
                </label>
                <label>
                    Time
                    <input
                        value={ride.time}
                        onChange={handleChange}
                        type="time"
                        id="time"
                        className="form-input"
                        required
                    />
                </label>
                <label>
                    Estimated duration
                    <input
                        value={ride.estimatedDuration}
                        onChange={handleChange}
                        type="time"
                        id="estimated_duration"
                        className="form-input"
                        required
                    />
                </label>
                <label>
                    Start location
                    <input 
                        value={ride.startLocation}
                        onChange={handleChange}
                        type="text"
                        id="start_location"
                        className="form-input"
                        required
                    />
                </label>
                <label>
                    Description
                    <textarea
                        value={ride.description}
                        onChange={handleChange}
                        id="description"
                        className="form-input"
                    />
                </label>
                <label>
                    Max attendance
                    <input
                        value={ride.maxAttendance}
                        onChange={handleChange} 
                        type="number" 
                        id="max_attendance"
                        className="form-input"
                    />
                </label>
                <input type="submit" value="Create ride" className="form-button"></input>
            </form>
        </>
    ); 
}