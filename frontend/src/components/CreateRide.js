import axios from "axios";
import { useState } from "react";
import '../styles/FormStyles.css';
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom'; // Import useHistory


export default function Form() {
  const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
        date: "",
        time: "",
        estimated_duration: "",
        city: "",
        start_location: "",
        description: "",
        max_attendance: "",

    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        axios.post(`${env.BASE_URL}/create-ride`, input)
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
                        value={input.estimated_duration}
                        onChange={handleChange}
                        type="time"
                        id="estimated_duration"
                        className="form-input"
                        required
                    />
                </label>
                <label>
                    City
                    <input 
                        value={input.city}
                        onChange={handleChange}
                        type="text"
                        id="city"
                        className="form-input"
                        required
                    />
                </label>
                <label>
                    Start location
                    <input 
                        value={input.start_location}
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
                        value={input.description}
                        onChange={handleChange}
                        id="description"
                        className="form-input"
                    />
                </label>
                <label>
                    Max attendance
                    <input
                        value={input.max_attendance}
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