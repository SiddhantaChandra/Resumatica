import React, { useState } from 'react';
import '../styles/cert-skills.css';
import { ArrowsIn, ArrowsOut, ArrowsClockwise } from '@phosphor-icons/react';
import ShowSectionBtn from './ShowSectionBtn';

function Skills({ parseData, setParseData, showSection, setShowSection }) {
  const [skills, setSkills] = useState(parseData.skills);
  const [expandSkills, setExpandSKills] = useState(1);

  const handleExpandSkills = () => {
    if (expandSkills === 1) setExpandSKills(0);
    if (expandSkills === 0) setExpandSKills(1);
  };

  const handleSkillsChange = (e) => {
    console.log(e.target.value);
    setSkills((prev) => setSkills(e.target.value));
  };

  const handleUpdateSkills = () => {
    setParseData((prev) => {
      const newObj = { ...prev };
      newObj.skills = skills;
      return newObj;
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
              name="showSkills"
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
              name="showSkills"
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
