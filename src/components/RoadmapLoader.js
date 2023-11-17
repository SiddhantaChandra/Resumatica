import React from 'react';
import { TailSpin } from 'react-loader-spinner';

function RoadmapLoader() {
  return (
    <div className="loader-container">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#de1b89"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
      />
    </div>
  );
}

export default RoadmapLoader;
