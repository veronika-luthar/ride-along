import axios from "axios";
import { useState } from "react";
import '../styles/FormStyles.css';
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom';

export default function CreateRide() {
    const navigate = useNavigate();
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
        const token = localStorage.getItem('token');
        axios.post(`${env.BASE_URL}/create-ride`, input, { headers: { Authorization: `Bearer ${token}`}})
            .then(function (response) {
                if(response.status === 200){
                    alert("Ride Created!");
                    navigate('/');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    Title
                    <input
                        value={input.title}
                        onChange={handleChange}
                        type="text"
                        minLength="2"
                        maxLength="50"
                        id="title"
                        className="form-input"
                        required
                    />
                </label>
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
                        type="number"
                        min="3"
                        max="10"
                        id="estimatedDuration"
                        className="form-input"
                    />
                </label>
                <label>
                    City
                    <input 
                        value={input.city}
                        onChange={handleChange}
                        type="text"
                        minLength="2"
                        maxLength="100"
                        id="city"
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
                        minLength="2"
                        maxLength="250"
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
                        maxLength="500"
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
                <input type="submit" value="Create ride" className="form-button"></input>
            </form>
        </>
    ); 
}