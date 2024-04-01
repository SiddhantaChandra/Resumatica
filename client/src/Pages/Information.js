import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import DefaultResume from '../components/Resumes/Resume-1/DefaultResume';

import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sections from '../components/Sections';

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
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
      <div className="display-info-pdf">
        <Sections
          parseData={parseData}
          setParseData={setParseData}
          showSection={showSection}
          setShowSection={setShowSection}
        />

        <DefaultResume parseData={parseData} showSection={showSection} />
      </div>
    </div>
  );
}

export default Information;
