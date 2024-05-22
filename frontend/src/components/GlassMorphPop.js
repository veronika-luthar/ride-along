import React from "react";
import Ride from "./Ride";
import '../styles/GlassPopUp.css';
import '../styles/FormStyles.css';

const GlassmorphismPopup = ({ ride, onClose }) => {
    return (
      <div className="glassmorphism-popup">
        <div className="glassmorphism-content">
          <Ride ride={ride} />
          <button className="form-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  };

export default GlassmorphismPopup;