import React from 'react';
import '../styles/work.css';
import WorkDetails from '../components/WorkDetails';

function WorkExperience({
  parseData,
  setParseData,
  showSection,
  setShowSection,
}) {
  return (
    <div className="work-exp-container">
      <WorkDetails
        parseData={parseData}
        setParseData={setParseData}
        showSection={showSection}
        setShowSection={setShowSection}
      />
    </div>
  );
}

export default WorkExperience;
