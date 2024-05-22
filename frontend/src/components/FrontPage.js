import React from 'react';
import '../styles/FrontPage.css';
import Header from './Header';
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
let navigate = useNavigate(); 
const routeChange = () =>{ 
    let path = `/rides`; 
    navigate(path);
}
  return (
    <div className="frontpage">
      <div className="overlaylayer"></div>
      <div className="focalpoint">
        <h1 className="main-text">Ride Along</h1>
        <p className="description-text">
          Connect with other mountain bikers and organize rides to go on together.
        </p>
        </div>
        <span className="button-text">Let's ride</span>
        <button className="button-arrow" onClick={routeChange} >
          <div className="button-arrow-eclipse"></div>
          <div id="button-arrow"></div>
        </button>
    </div>
  );
};

export default FrontPage;