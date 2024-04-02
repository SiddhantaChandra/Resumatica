import React from 'react';
import DefaultResume from './Resumes/Resume-1/DefaultResume';
function ResumeControls({ parseData, showSection }) {
  return (
    <section>
      <DefaultResume parseData={parseData} showSection={showSection} />
    </section>
  );
}

export default ResumeControls;
