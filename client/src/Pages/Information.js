import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import Sections from '../components/Sections';
import ResumeControls from '../components/ResumeControls';
import { ToastContainer } from 'react-toastify';

function Information({ parseData, setParseData }) {
  const [showSection, setShowSection] = useState({
    Summary: 1,
    Experience: 1,
    Education: 1,
    Projects: 1,
    Certifications: 1,
    Skills: 1,
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
