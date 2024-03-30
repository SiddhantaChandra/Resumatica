import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import InfoDetails from '../components/InfoDetails';
import EducationDetails from '../components/EducationDetails';
import DefaultResume from '../components/Resumes/Resume-1/DefaultResume';
import WorkExperience from './WorkExperience';
import Summary from './Summary';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Skills from '../components/Skills';

function Information({ parseData, setParseData }) {
  const [showSection, setShowSection] = useState({
    showSummary: 1,
    showWork: 1,
    showEdu: 1,
    showProj: 1,
    showCert: 1,
    showSkills: 1,
  });

  return (
    <div className="information-container">
      <Navbar />
      <div className="display-info-pdf">
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
        <DefaultResume parseData={parseData} showSection={showSection} />
      </div>
    </div>
  );
}

export default Information;
