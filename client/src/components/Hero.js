import React from 'react';
import Navbar from './Navbar';
import Dropzone from './Dropzone';
import '../styles/style-1.css';

function Hero({ setParseData }) {
  return (
    <div className="hero-container">
      <Navbar className="hero-nav" />
      <Dropzone setParseData={setParseData} />
    </div>
  );
}

export default Hero;
