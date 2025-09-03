import React, { useState } from "react";
import "../SignLanguageSelector.css"; // import css file
import Gujrat from '../images/Gujrat.png';
import India from '../images/India.png';
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const SignLanguageSelector = () => {
  const [selected, setSelected] = useState("ASL");

  const languages = [
    {
      id: "ISL",
      name: "Indian Sign Language",
      flagClass: "indian-flag",
      image: India, // Your India flag image
    },
    {
      id: "GSL",
      name: "Gujrati Sign Language",
      flagClass: "gujrat-flag",
      image: Gujrat, // Your Gujarat flag image
    }
  ];

  const handleSave = () => {
    console.log("Selected language:", selected);
    // Add your save logic here
  };

  return (
    <div className="container">
      {/* Back arrow */}
     <Link to="/profile"> <div className="back-arrow"><IoArrowBack /></div></Link> 
      
      <h1 className="title">Which sign language do you want to learn?</h1>

      <div className="options">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className={`option ${selected === lang.id ? "selected" : ""}`}
            onClick={() => setSelected(lang.id)}
          >
            <div className="left">
              <div className={`circle ${lang.flagClass}`}>
                <img src={lang.image} alt={lang.id} />
              </div>
              <div>
                <p className="lang-id">{lang.id}</p>
                <p className="lang-name">{lang.name}</p>
              </div>
            </div>
            
            {/* Option 1: Use custom radio styling */}
            <div className="radio-custom"></div>
            
            {/* Option 2: Use regular radio input (comment above and uncomment below) */}
            {/* <input
              type="radio"
              checked={selected === lang.id}
              readOnly
              className="radio"
            /> */}
          </div>
        ))}
      </div>
      <Link to="/profile"  className="save-link">
      <button className="save-btn" onClick={handleSave}>
        Save
      </button>
      </Link>
    </div>
  );
};

export default SignLanguageSelector;