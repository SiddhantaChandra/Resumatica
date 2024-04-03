import React, { useState } from 'react';
import circleUp from '../img/icons/arrow-up-circle.svg';
import circleDown from '../img/icons/arrow-down-circle.svg';
import {
  Trash,
  ArrowsOut,
  ArrowsIn,
  ListPlus,
  ArrowsClockwise,
} from '@phosphor-icons/react';
import '../styles/info.css';
import ShowSectionBtn from './ShowSectionBtn';
import { toast, Bounce } from 'react-toastify';

function EducationDetails({
  parseData,
  setParseData,
  showSection,
  setShowSection,
}) {
  const [education, setEducation] = useState(() => {
    return parseData.education
      ? parseData.education
      : [
          {
            institution: '',
            gpa: '',
            degree: '',
            dates: '',
          },
        ];
  });
  const [expandEdu, setExpandEdu] = useState(1);

  const handleUpdateEdu = () => {
    setParseData((prev) => {
      const newObj = { ...prev };
      newObj.education = education;
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

  const handleInputChange = (index, value, name) => {
    setEducation((prev) => {
      const newArray = [...prev];
      newArray[index] = {
        ...newArray[index],
        [name]: value,
      };
      return newArray;
    });
  };

  const handleIndexIncrease = (index) => {
    setEducation((prev) => {
      const newArray = [...prev];
      const up = newArray[index];
      const down = newArray[index - 1];
      newArray[index] = down;
      newArray[index - 1] = up;

      return newArray;
    });
  };

  const handleIndexDecrease = (index) => {
    setEducation((prev) => {
      const newArray = [...prev];
      const up = newArray[index + 1];
      const down = newArray[index];
      newArray[index] = up;
      newArray[index + 1] = down;

      return newArray;
    });
  };

  const handleDeleteEducation = (index) => {
    setEducation((prev) => {
      let newArray = [...prev];
      newArray = newArray.filter((el, i) => index !== i);
      return newArray;
    });
  };

  const handleExpandEdu = () => {
    if (expandEdu === 1) setExpandEdu(0);
    if (expandEdu === 0) setExpandEdu(1);
  };

  const handleAddEducation = (i) => {
    setEducation((prev) => {
      const newArr = [...prev];
      newArr.splice(i + 1, 0, {
        institution: '',
        gpa: '',
        degree: '',
        dates: '',
      });
      return newArr;
    });
  };

  return (
    <div>
      <div className="education-info-wrapper">
        {education != null &&
          expandEdu === 1 &&
          education.map((el, i, arr) => {
            return (
              <div className="info-box edu-box highlight" key={`edu-${i + 1}`}>
                {i === 0 && (
                  <div className="expand-heading-box">
                    <h3 className="heading-box heading-box-edu">
                      Education Details
                    </h3>
                    {expandEdu === 1 && (
                      <button className="expand-btn" onClick={handleExpandEdu}>
                        <ArrowsIn size={24} color="#fff" />
                      </button>
                    )}
                    <ShowSectionBtn
                      name="Education"
                      showSection={showSection}
                      setShowSection={setShowSection}
                    />
                    <button
                      className="update-button m-18"
                      onClick={handleUpdateEdu}
                    >
                      <ArrowsClockwise size={24} />
                      Update
                    </button>
                  </div>
                )}
                <div className="label-btn-box " key={`education-${i + 1}`}>
                  <label className="label label-1">Institution {i + 1}</label>
                  {i === 0 && arr.length > 1 && (
                    <div className="btn-inc-dec-box">
                      <button
                        className="btn-inc-dec btn-trash"
                        onClick={(e) => handleDeleteEducation(i)}
                      >
                        <Trash size={20} color="#fff" />
                      </button>
                      <button
                        className="btn-inc-dec"
                        onClick={(e) => handleIndexDecrease(i)}
                      >
                        <img src={circleDown} alt="Put Box Below Button" />
                      </button>
                    </div>
                  )}
                  {i === arr.length - 1 && arr.length > 1 && (
                    <div className="btn-inc-dec-box">
                      <button
                        className="btn-inc-dec btn-trash"
                        onClick={(e) => handleDeleteEducation(i)}
                      >
                        <Trash size={20} color="#fff" />
                      </button>
                      <button
                        className="btn-inc-dec"
                        onClick={(e) => handleIndexIncrease(i)}
                      >
                        <img src={circleUp} alt="Put Box Above Button" />
                      </button>
                    </div>
                  )}
                  {i > 0 && i < arr.length - 1 && (
                    <div className="btn-inc-dec-box">
                      <button
                        className="btn-inc-dec btn-trash"
                        onClick={(e) => handleDeleteEducation(i)}
                      >
                        <Trash size={20} color="#fff" />
                      </button>
                      <button
                        className="btn-inc-dec"
                        onClick={(e) => handleIndexIncrease(i)}
                      >
                        <img src={circleUp} alt="Put Box Above Button" />
                      </button>
                      <button
                        className="btn-inc-dec"
                        onClick={(e) => handleIndexDecrease(i)}
                      >
                        <img src={circleDown} alt="Put Box Below Button" />
                      </button>
                    </div>
                  )}
                </div>
                <input
                  placeholder="Massachusetts Institute of Technology"
                  className="input edu-input"
                  value={el.institution}
                  name="institution"
                  onChange={(e) =>
                    handleInputChange(i, e.target.value, e.target.name)
                  }
                />
                <label className="label edu-label">Degree {i + 1}</label>
                <input
                  placeholder="Masters in Computer Science"
                  className="input edu-input"
                  value={el.degree}
                  name="degree"
                  onChange={(e) =>
                    handleInputChange(i, e.target.value, e.target.name)
                  }
                />
                <label className="label edu-label">Dates {i + 1}</label>
                <input
                  placeholder="2019-2021"
                  className="input edu-input"
                  name="dates"
                  value={el.dates}
                  onChange={(e) =>
                    handleInputChange(i, e.target.value, e.target.name)
                  }
                />
                <label className="label edu-label">GPA {i + 1}</label>
                <input
                  placeholder="8.7"
                  className="input edu-input"
                  name="gpa"
                  value={el.gpa}
                  onChange={(e) =>
                    handleInputChange(i, e.target.value, e.target.name)
                  }
                />
                <button
                  className=" add-education-btn"
                  onClick={(e) => handleAddEducation(i)}
                >
                  <ListPlus size={24} color="#fff" />
                  Add Education
                </button>
              </div>
            );
          })}
        {education != null && expandEdu === 0 && (
          <div className="info-box edu-box highlight border-radius">
            <div className="expand-heading-box">
              <h3 className="heading-box heading-box-edu">Education Details</h3>

              <button className="expand-btn" onClick={handleExpandEdu}>
                <ArrowsOut size={24} color="#fff" />
              </button>
              <ShowSectionBtn
                name="Education"
                showSection={showSection}
                setShowSection={setShowSection}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EducationDetails;
