import { createContext, useState, useContext } from 'react';
import axios from "axios";
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom';

const FormContext = createContext(null);

export default function CreateRide(){

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
    const [form, setForm] = useState(0);
    const [errors, setErrors] = useState([]);

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
                    setForm(form+1);
                }
            })
            .catch(function (error) {
                if(error.status === 500){
                    const errorType = error.response.data.error;
                    if(errorType.name === "SequelizeValidationError"){
                        const errors = errorType.errors.map((x)  => x.message);
                        setErrors(errors);
                    }
                    else{
                        setErrors(["Unknown error occurred"]);
                    }
                }
            });
    }

    function handleNext(){
        setForm(form + 1);
    }

    function handlePrev(){
        setForm(form - 1);
    }

    return(
        <FormContext.Provider value={{input, form, errors, handleChange, handleSubmit, handleNext, handlePrev}}>
            <PageCounter/>
        </FormContext.Provider>
    )
}

function PageCounter(){
    const context = useContext(FormContext);
    switch(context.form){
        case 0:
            return(
                <FirstForm/>
            )
        case 1:
            return(
                <SecondForm/>
            )
        case 2:
            return(
                <ThirdForm/>
            )
        case 3:
            return(
                <SuccessForm/>
            )
        default:
            return(
                <FirstForm/>
            )
    }
}

function FirstForm(){
    const context = useContext(FormContext);
    const navigate = useNavigate();

    return(
        <div>
            <h1>Create your ride</h1>
            <form onSubmit={context.handleNext}>
                <label>
                    City
                    <input 
                        value={context.input.city}
                        onChange={context.handleChange}
                        type="text"
                        minLength="2"
                        maxLength="100"
                        id="city"
                        className="form-input"
                        required
                    />
                </label>
                <label>
                    Date
                    <input
                        value={context.input.date}
                        onChange={context.handleChange}
                        type="date"
                        id="date"
                        className="form-input"
                        required
                    />
                </label>
                <label>
                    Time
                    <input
                        value={context.input.time}
                        onChange={context.handleChange}
                        type="time"
                        id="time"
                        className="form-input"
                        required
                    />
                </label>
                <input type="submit" value="Next"/>
            </form>
            <button onClick={() => {navigate('/rides')}}>Cancel</button>
        </div>
    )
}

function SecondForm(){
    const context = useContext(FormContext);
    return(
        <div>
            <h1>Create your ride</h1>
            <form onSubmit={context.handleNext}>
                <label>
                    Start location
                    <input 
                        value={context.input.startLocation}
                        onChange={context.handleChange}
                        type="text"
                        minLength="2"
                        maxLength="250"
                        id="startLocation"
                        className="form-input"
                        required
                    />
                </label>
                <label>
                    Estimated duration
                    <input
                        value={context.input.estimatedDuration}
                        onChange={context.handleChange}
                        type="number"
                        min="1"
                        max="10"
                        id="estimatedDuration"
                        className="form-input"
                    />
                </label>
                <label>
                    Max attendance
                    <input
                        value={context.input.maxAttendance}
                        onChange={context.handleChange} 
                        type="number" 
                        id="maxAttendance"
                        className="form-input"
                    />
                </label>
                <input value="Next" type="submit"/>
            </form>
            <button onClick={context.handlePrev}>Back</button>
        </div>
    )
}

function ThirdForm(){
    const context = useContext(FormContext);
    return(
        <div>
            <h1>Create your ride</h1>
            <form onSubmit={context.handleSubmit}>
                <label>
                    Title
                    <input
                        value={context.input.title}
                        onChange={context.handleChange}
                        type="text"
                        minLength="2"
                        maxLength="50"
                        id="title"
                        className="form-input"
                        required
                    />
                </label>
                <label>
                    Description
                    <textarea
                        value={context.input.description}
                        onChange={context.handleChange}
                        maxLength="500"
                        id="description"
                        className="form-input"
                    />
                </label>
                {
                   context.errors.map((error, index) => <p key={index}>{error}</p>)
                }
                <input value="Submit" type="submit"/>
            </form>
            <button onClick={context.handlePrev}>Back</button>
        </div>
    )
}

function SuccessForm(){
    const navigate = useNavigate();

    return(
        <div>
            <h1>Success!</h1>
            <h3>Your ride has been created.</h3>
            <button onClick={() => {navigate('/rides')}}>Take me to 'my rides'</button>
        </div>
    )
}