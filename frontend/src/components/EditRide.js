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

    function deleteRide(){
        const token = localStorage.getItem('token');
        console.log(ride.id);
        if(window.confirm("Are you sure you want to delete this ride?")){
            axios.post(`${env.BASE_URL}/delete-ride`, {id: ride.id}, { headers: { Authorization: `Bearer ${token}`}})
                .then(function (response){
                    if(response.status === 200){
                        alert("Ride Deleted!");
                        localStorage.removeItem('ride-edit');
                        navigate('/');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })   
        }
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.post(`${env.BASE_URL}/edit-ride`, input, { headers: { Authorization: `Bearer ${token}`}})
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
            <button onClick={deleteRide}>Delete</button>
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
                        type="number"
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