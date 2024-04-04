import React, { useState } from 'react';
import DefaultResume from './Resumes/Resume-1/DefaultResume';
import Resume2 from './Resumes/Resume-2/Resume2';
function ResumeControls({ parseData, showSection }) {
  const [selectResume, setSelectResume] = useState('1');
  const handleSelectResume = (e) => {
    setSelectResume(e.target.value);
  };
  return (
    <section>
      <select className="select-resume" onChange={handleSelectResume}>
        <option value="1">Resume 1</option>
        <option value="2">Resume 2</option>
      </select>
      {selectResume === '1' && (
        <DefaultResume parseData={parseData} showSection={showSection} />
      )}
      {selectResume === '2' && (
        <Resume2 parseData={parseData} showSection={showSection} />
      )}
    </section>
  );
}

export default ResumeControls;
