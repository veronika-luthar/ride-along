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
            <h1>{input.title}</h1>
            <h2>{input.city}</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    Date
                    <input
                        value={input.date}
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
                        value={input.time}
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
                        value={input.estimatedDuration}
                        onChange={handleChange}
                        type="time"
                        id="estimatedDuration"
                        className="form-input"
                        required
                    />
                </label>
                <label>
                    Start location
                    <input 
                        value={input.startLocation}
                        onChange={handleChange}
                        type="text"
                        id="startLocation"
                        className="form-input"
                        required
                    />
                </label>
                <label>
                    Description
                    <textarea
                        value={input.description}
                        onChange={handleChange}
                        id="description"
                        className="form-input"
                    />
                </label>
                <label>
                    Max attendance
                    <input
                        value={input.maxAttendance}
                        onChange={handleChange} 
                        type="number" 
                        id="maxAttendance"
                        className="form-input"
                    />
                </label>
                <input type="submit" value="Confirm" className="form-button"></input>
            </form>
        </>
    ); 
}