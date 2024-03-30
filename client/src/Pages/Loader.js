import React from 'react';
import { DNA } from 'react-loader-spinner';
import '../styles/loader.css';
import { Typewriter } from 'react-simple-typewriter';

function Loader() {
  const wordsArray = [
    'Parsing Basic Information',
    'Parsing Work Experience',
    'Parsing Education',
    'Parsing Summary',
    'Parsing Projects',
    'Parsing Certications',
    'Parsing Skills',
  ];
  return (
    <div className="wrapper-loader">
      <div className="dna-box">
        <DNA
          visible={true}
          height="300"
          width="300"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        <div className="typewritertext">
          <Typewriter
            words={wordsArray}
            loop={true}
            deleteSpeed={150}
            typeSpeed={120}
          />
        </div>
      </div>
    </div>
  );
}

export default Loader;
