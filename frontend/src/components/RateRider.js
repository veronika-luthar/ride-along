import { useState } from "react";

export default function RateRider(rideId){
    const[stars, setStars] = useState([false, false, false, false, false ]);
    const[countStars, setCountStars] = useState(0);
    
    function handleChange(e){
        let num = e.target.id;
        setCountStars(num);
        let newStars = new Array(5).fill(false);
        for(let i = 0; i <= num; i++){
            newStars[i] = true;
        }
        setStars(newStars);
    }

    function handleSubmit(e){
        /* TO-DO */
        
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    Review
                    <Stars
                        stars={stars}
                        handleChange={handleChange}
                        className="form-input"
                    />
                </label>
                <label>
                    Comment
                    <textarea className="form-input"/>
                </label>
                <input type="submit" value="Submit review" className="form-button"></input>
            </form>
        </>
    )
}

function Stars({stars, handleChange, className}){
    return (
        <>
            <div className={className}>
                {
                    stars.map((star, index) => (
                        <input
                            type="checkbox"
                            checked={star}
                            onChange={handleChange}
                            id={index}
                        />
                    ))
                }
            </div>
        </>
    )
}