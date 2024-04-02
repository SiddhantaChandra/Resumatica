import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import Sections from '../components/Sections';
import ResumeControls from '../components/ResumeControls';
import { ToastContainer } from 'react-toastify';

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
      <ToastContainer />
      <div className="display-info-pdf">
        <Sections
          parseData={parseData}
          setParseData={setParseData}
          showSection={showSection}
          setShowSection={setShowSection}
        />
        <ResumeControls parseData={parseData} showSection={showSection} />
      </div>
    </div>
  );
}

export default Information;
