import React, { useState } from 'react';
import DefaultResume from './Resumes/Resume-1/DefaultResume';
import Resume2 from './Resumes/Resume-2/Resume2';
import Analysis from './Analysis/Analysis';
function ResumeControls({ parseData, showSection }) {
  const [selectResume, setSelectResume] = useState('1');
  const [selectWindow, setSelectWindow] = useState(0);
  const [careerPaths, setCareerPaths] = useState(null);
  const [isALoading, setisALoading] = useState(0);
  const [isCPLoaded, setIsCPLoaded] = useState(0);
  const handleSelectResume = (e) => {
    setSelectResume(e.target.value);
  };

  const handleSetResume = () => {
    setSelectWindow(0);
  };

  const handleSetAnalysis = () => {
    if (isCPLoaded === 1) setSelectWindow(1);
    else {
      setSelectWindow(1);
      setisALoading(1);
      fetch('/career-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parseData),
      })
        .then((res) => res.json())
        .then((data) => setCareerPaths(data.Course));

      setisALoading(0);
      setIsCPLoaded(1);
    }
  };

  const bgcolresume =
    selectWindow === 0
      ? { backgroundColor: '#de1b89' }
      : { backgroundColor: '#373737' };

  const bgcolanalysis =
    selectWindow === 1
      ? { backgroundColor: '#de1b89' }
      : { backgroundColor: '#373737' };

  return (
    <section className="resume-controls">
      <div className="resume-controls-box">
        <div className="select-window-box">
          <button
            className="select-window-btn resume-window-toggle"
            onClick={handleSetResume}
            style={bgcolresume}
          >
            Resume
          </button>
          <button
            className="select-window-btn analysis-window-toggle"
            onClick={handleSetAnalysis}
            style={bgcolanalysis}
          >
            Analysis
          </button>
        </div>
        {selectWindow === 0 && (
          <div>
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
          </div>
        )}
        {selectWindow === 1 && (
          <Analysis
            careerPaths={careerPaths}
            setCareerPaths={setCareerPaths}
            isALoading={isALoading}
            setisALoading={setisALoading}
            parseData={parseData}
          />
        )}
      </div>
    </section>
  );
}

export default ResumeControls;
