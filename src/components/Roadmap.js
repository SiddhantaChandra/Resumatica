import React, { useState } from 'react';
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/react/24/solid';

function Roadmap({ detailedPath, selectedPath }) {
  const [displayRoadmap, setDisplayRoadmap] = useState(0);

  const handleShowRoadmap = () => {
    if (displayRoadmap === 0) setDisplayRoadmap(1);
    else setDisplayRoadmap(0);
  };

  return (
    <div>
      <div onClick={handleShowRoadmap} className="d-improv-heading">
        {displayRoadmap === 0 ? (
          <h3 className="d-subhead">RoadMap for {selectedPath}</h3>
        ) : (
          <h3 className="d-subhead">RoadMap for {selectedPath}</h3>
        )}
        {displayRoadmap === 0 ? (
          <ChevronDoubleDownIcon className="d-showmore" />
        ) : (
          <ChevronDoubleUpIcon className="d-showmore" />
        )}
      </div>
      <div className="d-roadmaps">
        {detailedPath.job1.map((el, i) => {
          return (
            <p
              key={`RM${i}`}
              className={displayRoadmap === 0 ? 'd-roadmap' : 'roadmap'}
            >
              {el}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Roadmap;
