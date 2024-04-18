import axios from "axios";
import { useState } from "react";

export default function Form() {
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
        axios.post('http://localhost:3000/create-ride', input)
            .then(function (response) {
                if(response.status === 200){
                    alert("Success!");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        value={input.title}
                        onChange={handleChange}
                        type="text"
                        id="title"
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
                        required
                    />
                </label>
                <label>
                    Description
                    <textarea
                        value={input.description}
                        onChange={handleChange}
                        id="description"
                    />
                </label>
                <label>
                    Max attendance
                    <input
                        value={input.max_attendance}
                        onChange={handleChange} 
                        type="number" 
                        id="max_attendance"
                    />
                </label>
                <input type="submit" value="Create ride"></input>
            </form>
        </>
    ); 
}