import { useState } from "react";
import '../styles/FormStyles.css';

export default function Stars(){
    const[numStars, setNumStars] = useState([false, false, false, false, false ]);
    
    function handleChange(e){
        let num = e.target.id;
        let newStars = new Array(5).fill(false);
        for(let i = 0; i <= num; i++){
            newStars[i] = true;
        }
        setNumStars(newStars);
        
    }
    return (
        <>
            {
                numStars.map((stars, index) => (
                    <input
                        type="checkbox"
                        checked={stars}
                        onChange={handleChange}
                        id={index}
                    />
                ))
            }
        </>
    )
}