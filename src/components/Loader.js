import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Dna } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="loader-container">
      <Dna
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      <span className="loader">
        <Typewriter
          words={[
            'Using AI to judge you',
            'AI is slow, please wait',
            'AI stands for After Infinity',
            'If the AI roasts you, it is not our fault',
          ]}
          loop={0}
        />
      </span>
    </div>
  );
}

export default Loader;
