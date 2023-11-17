import React, { useState } from 'react';
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/react/24/solid';
import '../styles/dashbord.css';

function Improvements({ response }) {
  const [showImprov, setShowImprov] = useState(0);
  const length = response.Improvements.length;
  const handleImprovVisibility = () => {
    if (showImprov === 0) {
      setShowImprov(1);
    } else {
      setShowImprov(0);
    }
  };

  return (
    <div>
      <div className="d-improv-heading" onClick={handleImprovVisibility}>
        {showImprov === 0 ? (
          <h2 className="d-subhead">Improvements ({length})</h2>
        ) : (
          <h2 className="d-subhead">Improvements</h2>
        )}

        {showImprov === 0 ? (
          <ChevronDoubleDownIcon className="d-showmore" />
        ) : (
          <ChevronDoubleUpIcon className="d-showmore" />
        )}
      </div>
      <div className={showImprov === 0 ? ' hidden' : 'd-improvements'}>
        {response.Improvements.map((el, i) => {
          return (
            <p key={`Improv` + i} className="d-improvement">
              {i + 1}. {el}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Improvements;
