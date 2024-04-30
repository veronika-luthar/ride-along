import axios from "axios";
import { useState } from "react";
import '../styles/FormStyles.css';
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom'; // Import useHistory


export default function Form({input, onChange, onSubmit}) {
    return (
        <>
            <form onSubmit={onSubmit} className="form-container">
                <label>
                    Title
                    <input
                        value={input.title}
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
                        id="description"
                        className="form-input"
                    />
                </label>
                <label>
                    Max attendance
                    <input
                        value={input.max_attendance}
                        onChange={onChange} 
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