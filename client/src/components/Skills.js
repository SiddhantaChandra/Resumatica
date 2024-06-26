import React, { useState } from 'react';
import '../styles/cert-skills.css';
import { ArrowsIn, ArrowsOut, ArrowsClockwise } from '@phosphor-icons/react';
import ShowSectionBtn from './ShowSectionBtn';
import { toast, Bounce } from 'react-toastify';

function Skills({ parseData, setParseData, showSection, setShowSection }) {
  const [skills, setSkills] = useState(parseData.skills);
  const [expandSkills, setExpandSKills] = useState(1);

  const handleExpandSkills = () => {
    if (expandSkills === 1) setExpandSKills(0);
    if (expandSkills === 0) setExpandSKills(1);
  };

  const handleSkillsChange = (e) => {
    setSkills((prev) => setSkills(e.target.value));
  };

  const handleUpdateSkills = () => {
    setParseData((prev) => {
      const newObj = { ...prev };
      newObj.skills = skills;
      return newObj;
    });
    toast.success(' Updated Succesfully', {
      style: {
        fontSize: '1.4rem',
        // fontWeight: 'bold',
      },
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });
  };

  return (
    <section className="section-skills">
      <div className="skills-heading-box">
        <h3 className="heading-box">Skills</h3>
        {expandSkills === 1 ? (
          <>
            <button className="expand-btn" onClick={handleExpandSkills}>
              <ArrowsIn size={24} color="#fff" />
            </button>
            <ShowSectionBtn
              name="Skills"
              showSection={showSection}
              setShowSection={setShowSection}
            />
            <button className="update-button m-27" onClick={handleUpdateSkills}>
              <ArrowsClockwise size={24} />
              Update
            </button>
          </>
        ) : (
          <>
            <button className="expand-btn" onClick={handleExpandSkills}>
              <ArrowsOut size={24} color="#fff" />
            </button>
            <ShowSectionBtn
              name="Skills"
              showSection={showSection}
              setShowSection={setShowSection}
            />
          </>
        )}
      </div>
      {expandSkills === 1 ? (
        <textarea
          className="input skills-input"
          placeholder="Javascript, MongoDB, SQL, Python, Django, Git"
          value={skills}
          onChange={handleSkillsChange}
        />
      ) : (
        <></>
      )}
    </section>
  );
}

export default Skills;
