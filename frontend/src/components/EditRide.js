import axios from "axios";
import { useState } from "react";
import '../styles/FormStyles.css';
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom'; // Import useHistory
import RideForm from './RideForm';


export default function EditRide() {
  const navigate = useNavigate();
    const [input, setInput] = useState({
        date: "",
        time: "",
        estimated_duration: "",
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
        axios.post(`${env.BASE_URL}/edit-ride`, input)
            .then(function (response) {
                if(response.status === 200){
                    alert("Ride Edited!");
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