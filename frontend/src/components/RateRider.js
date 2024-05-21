import { useState } from "react";
import React from 'react';
import {rateRide} from '../utils';

const RateRider = ({rideID}) => {
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
        e.preventDefault()
        const formData = new FormData(e.target);
        const comment = formData.get('comment');
        const rating = stars.filter(Boolean).length;
      
        console.log('Form submitted!');
        console.log(rideID)
        console.log('Comment:', comment);
        console.log('Rating:', rating);
        const ratingData = {
            rating: rating,
            comment: comment
        };
        rateRide(rideID,ratingData).then(() => {
            window.location.reload();
        });
        console.log(`You rated the rider ${rating} stars!`);
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
                 <textarea className="form-input" name="comment" />
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
};

export default RateRider;