import React from 'react';
import WorkExperience from '../Pages/WorkExperience';
import Summary from '../Pages/Summary';
import Projects from './Projects';
import Certifications from './Certifications';
import Skills from './Skills';
import InfoDetails from './InfoDetails';
import EducationDetails from './EducationDetails';

function Sections({ parseData, setParseData, showSection, setShowSection }) {
  return (
    <div className="info-boxes">
      <InfoDetails parseData={parseData} setParseData={setParseData} />
      <Summary
        parseData={parseData}
        setParseData={setParseData}
        showSection={showSection}
        setShowSection={setShowSection}
      />
      <WorkExperience
        parseData={parseData}
        setParseData={setParseData}
        showSection={showSection}
        setShowSection={setShowSection}
      />
      <EducationDetails
        parseData={parseData}
        setParseData={setParseData}
        showSection={showSection}
        setShowSection={setShowSection}
      />
      <Projects
        parseData={parseData}
        setParseData={setParseData}
        showSection={showSection}
        setShowSection={setShowSection}
      />
      <Certifications
        parseData={parseData}
        setParseData={setParseData}
        showSection={showSection}
        setShowSection={setShowSection}
      />
      <Skills
        parseData={parseData}
        setParseData={setParseData}
        showSection={showSection}
        setShowSection={setShowSection}
      />
    </div>
  );
}

export default Sections;
