import React, { useState } from 'react';
import Navbar from './Navbar';
import Dropzone from './Dropzone';
import '../styles/style-1.css';
import Loader from '../Pages/Loader';

function Hero({ setParseData }) {
  const [isParsing, setIsParsing] = useState(0);
  return (
    <div className="hero-container">
      <Navbar className="hero-nav" />
      {isParsing === 1 && <Loader />}
      {isParsing === 0 && (
        <Dropzone setParseData={setParseData} setIsParsing={setIsParsing} />
      )}
    </div>
  );
}

export default Hero;
