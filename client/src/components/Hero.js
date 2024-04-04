import React, { useState } from 'react';
import Navbar from './Navbar';
import Dropzone from './Dropzone';
import '../styles/style-1.css';
import Loader from '../Pages/Loader';
import { useNavigate } from 'react-router-dom';
import heroIMG from '../img/cta-banner.jpg';

function Hero({ setParseData }) {
  const [isParsing, setIsParsing] = useState(0);
  const navigate = useNavigate();
  const handleCreateNewResume = () => {
    setParseData({
      name: null,
      phone: null,
      email: null,
      homeaddress: null,
      summary: null,
      linkedin: null,
      education: null,
      workexperience: null,
      project: null,
      certifications: null,
      skills: null,
    });
    navigate('/edit-personal-info');
  };
  return (
    <div className="hero-container">
      <Navbar className="hero-nav" />
      {isParsing === 1 && <Loader />}
      {isParsing === 0 && (
        <div className="upload-section-hero">
          <Dropzone setParseData={setParseData} setIsParsing={setIsParsing} />

          <button onClick={handleCreateNewResume} className="create-resume-box">
            <button className="create-new-btn create-cta">Create Now</button>
            <img
              src={heroIMG}
              alt="Hero Banner to Create resume from scratch"
              className="hero-banner-img"
            />
            <button className="create-new-btn">
              Create Resume From Scratch
            </button>
          </button>
        </div>
      )}
    </div>
  );
}

export default Hero;
