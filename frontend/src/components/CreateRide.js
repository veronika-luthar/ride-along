import axios from "axios";
import { useState } from "react";
import '../styles/FormStyles.css';
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom'; // Import useHistory
import RideForm from './RideForm';


export default function CreateRide() {
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
            <RideForm 
                input={input}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </>
    ); 
}