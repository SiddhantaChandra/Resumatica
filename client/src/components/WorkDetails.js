import React, { useState } from 'react';
import {
  PlusCircle,
  Trash,
  ArrowsIn,
  ArrowsOut,
  CaretUp,
  CaretDown,
  Sparkle,
  ListPlus,
  ArrowsClockwise,
} from '@phosphor-icons/react';
import ImproveRes from './ImproveRes';
import ShowSectionBtn from './ShowSectionBtn';
import { toast, Bounce } from 'react-toastify';

function WorkDetails({ parseData, setParseData, showSection, setShowSection }) {
  const [experience, setExperience] = useState(() => {
    return parseData.workexperience
      ? parseData.workexperience.map((el) => ({
          ...el,
          responsibilities: el.responsibilities || [''],
        }))
      : [
          {
            position: '',
            employer: '',
            location: '',
            dates: '',
            responsibilities: [''],
          },
        ];
  });
  const [onFocusExpBox, SetOnFocusExpBox] = useState('');
  const [expandWork, setExpandWork] = useState(1);

  // console.log(experience);

  if (experience === null) {
    setExperience((prev) => {
      const newObj = { ...prev };
      newObj.workexperience = [
        {
          position: '',
          employer: '',
          location: '',
          dates: '',
          responsibilities: [''],
        },
      ];
      return newObj;
    });
  }

  const handleUpdateWork = () => {
    setParseData((prev) => {
      const newObj = { ...prev };
      newObj.workexperience = experience;
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

  // console.log(experience);

  //   console.log(experience);

  const handleExpChange = (value, name, index) => {
    setExperience((prev) => {
      const newArray = [...prev];
      newArray[index] = { ...newArray[index], [name]: value };
      return newArray;
    });
  };

  const handleFocusState = (index) => {
    // console.log(index);
    SetOnFocusExpBox(index);
  };

  const handleExpResChange = (value, name, index) => {
    setExperience((prev) => {
      const newArray = [...prev];
      newArray[onFocusExpBox] = {
        ...newArray[onFocusExpBox],
        responsibilities: newArray[onFocusExpBox].responsibilities.map(
          (res, i) => (i === index ? value : res),
        ),
      };
      return newArray;
    });
  };

  const handleAddResponsibilities = (index) => {
    setExperience((prev) => {
      const newArray = [...prev];
      newArray[index] = {
        ...newArray[index],
        responsibilities: [...newArray[index].responsibilities, ''],
      };

      return newArray;
    });
  };

  const handleDeleteResponsibility = (indexToRem, indexOfRespon) => {
    setExperience((prev) => {
      const newArray = [...prev];
      newArray[indexOfRespon] = {
        ...newArray[indexOfRespon],
        responsibilities: newArray[indexOfRespon].responsibilities.filter(
          (el, i) => i !== indexToRem,
        ),
      };
      // console.log(newArray);
      return newArray;
    });
  };

  const handleExpandWork = () => {
    if (expandWork === 0) setExpandWork(1);
    if (expandWork === 1) setExpandWork(0);
  };

  const handleWorkDelete = (i) => {
    setExperience((prev) => {
      const newArray = [...prev];
      newArray.splice(i, 1);
      // console.log(newArray);
      return newArray;
    });
  };

  const handleIndexDown = (i) => {
    setExperience((prev) => {
      const newArray = [...prev];
      const up = newArray[i + 1];
      const down = newArray[i];
      newArray[i] = up;
      newArray[i + 1] = down;
      // console.log(newArray);
      return newArray;
    });
  };

  const handleIndexUp = (i) => {
    setExperience((prev) => {
      const newArray = [...prev];
      const up = newArray[i];
      const down = newArray[i - 1];
      newArray[i] = down;
      newArray[i - 1] = up;
      return newArray;
    });
  };

  const handleAddWork = (i) => {
    setExperience((prev) => {
      let newArray = [...prev];
      newArray = [
        ...newArray,
        {
          position: '',
          employer: '',
          location: '',
          dates: '',
          responsibilities: [''],
        },
      ];
      return newArray;
    });
  };

  return (
    <div className="experience-container">
      {expandWork === 1 && (
        <div>
          {experience.map((el, i, arr) => {
            return (
              <div className="experiences-box" key={'work-' + i + 1}>
                {i === 0 && (
                  <div className="expand-work-box">
                    <h3 className="heading-box">Work Experience Details</h3>
                    <button className="expand-btn" onClick={handleExpandWork}>
                      <ArrowsIn size={24} color="#fff" />
                    </button>
                    <ShowSectionBtn
                      name="showWork"
                      showSection={showSection}
                      setShowSection={setShowSection}
                    />
                    <button
                      className="update-button m-13"
                      onClick={handleUpdateWork}
                    >
                      <ArrowsClockwise size={24} />
                      Update
                    </button>
                  </div>
                )}
                <div className="experience-box">
                  {i !== 0 && i !== arr.length - 1 ? (
                    <div className="work-btn-boxes">
                      <label className="label work-label">
                        Position {i + 1}
                      </label>
                      <div className="work-btn-box">
                        <button
                          className="work-up-btn trash"
                          onClick={(e) => handleWorkDelete(i)}
                        >
                          <Trash size={20} color="#fff" />
                        </button>
                        <button
                          className="work-up-btn"
                          onClick={(e) => handleIndexUp(i)}
                        >
                          <CaretUp size={24} weight="bold" color="#fff" />
                        </button>
                        <button
                          className="work-up-btn"
                          onClick={(e) => handleIndexDown(i)}
                        >
                          <CaretDown size={24} weight="bold" color="#fff" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {i === 0 && arr.length > 1 ? (
                    <div className="work-btn-boxes">
                      <label className="label work-label">
                        Position {i + 1}
                      </label>
                      <div className="work-btn-box">
                        <button
                          className="work-up-btn trash"
                          onClick={(e) => handleWorkDelete(i)}
                        >
                          <Trash size={20} color="#fff" />
                        </button>
                        <button
                          className="work-up-btn"
                          onClick={(e) => handleIndexDown(i)}
                        >
                          <CaretDown size={24} weight="bold" color="#fff" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {i === arr.length - 1 && arr.length > 1 ? (
                    <div className="work-btn-boxes">
                      <label className="label work-label">
                        Position {i + 1}
                      </label>
                      <div className="work-btn-box">
                        <button
                          className="work-up-btn trash"
                          onClick={(e) => handleWorkDelete(i)}
                        >
                          <Trash size={20} color="#fff" />
                        </button>
                        <button
                          className="work-up-btn"
                          onClick={(e) => handleIndexUp(i)}
                        >
                          <CaretUp size={24} weight="bold" color="#fff" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {arr.length === 1 && (
                    <div className="work-btn-boxes">
                      <label className="label work-label">
                        Position {i + 1}
                      </label>
                      <div className="work-btn-box"></div>
                    </div>
                  )}
                  <input
                    placeholder="Software Developer I"
                    className="input work-input"
                    name="position"
                    value={el.position}
                    onChange={(e) =>
                      handleExpChange(e.target.value, e.target.name, i)
                    }
                  />
                </div>
                <div className="experience-box">
                  <label className="label">Employer {i + 1}</label>
                  <input
                    placeholder="Google Inc."
                    className="input work-input"
                    name="employer"
                    value={el.employer}
                    onChange={(e) =>
                      handleExpChange(e.target.value, e.target.name, i)
                    }
                  />
                </div>
                <div className="experience-box">
                  <label className="label">Dates {i + 1}</label>
                  <input
                    placeholder="2022-2024"
                    className="input work-input"
                    name="dates"
                    value={el.dates}
                    onChange={(e) =>
                      handleExpChange(e.target.value, e.target.name, i)
                    }
                  />
                </div>
                <div className="experience-box">
                  <label className="label">Location {i + 1}</label>
                  <input
                    placeholder="California, USA"
                    className="input work-input"
                    name="location"
                    value={el.location}
                    onChange={(e) =>
                      handleExpChange(e.target.value, e.target.name, i)
                    }
                  />
                </div>
                <div
                  className="experience-box"
                  onFocus={(e) => handleFocusState(i)}
                >
                  <label className="label">Responsibilities {i + 1}</label>

                  {el.responsibilities === null ? (
                    <></>
                  ) : (
                    el.responsibilities.map((el, index) => {
                      return (
                        <div
                          key={'res-box' + index}
                          className="res-box-container"
                        >
                          <button
                            key={'delete-' + i}
                            className="delete-res-btn"
                            onClick={(e) =>
                              handleDeleteResponsibility(index, i)
                            }
                          >
                            <Trash size={24} />
                          </button>
                          <textarea
                            placeholder="Implemented improved search query parsing, leading to a 25% improvement in search result fetch speed."
                            key={'Res-' + index + 1}
                            className="input res-box work-input res-text-area"
                            name="responsibilities"
                            value={el}
                            onChange={(e) =>
                              handleExpResChange(
                                e.target.value,
                                e.target.name,
                                index,
                              )
                            }
                          />
                          {el.length > 10 && (
                            <ImproveRes
                              respon={el}
                              indexOfRespon={index}
                              indexOfWork={i}
                              setExperience={setExperience}
                            />
                          )}
                        </div>
                      );
                    })
                  )}
                  <button
                    className="add-res-btn outline-box"
                    onClick={(e) => handleAddResponsibilities(i)}
                  >
                    <button className="delete-res-btn outline-trash-vert ">
                      <Trash size={24} />
                    </button>
                    <div className="div-outline">
                      <PlusCircle
                        size={24}
                        weight="bold"
                        className="add-res-icon"
                      />
                    </div>
                    <button className="improve-res-btn outline-btn-imp">
                      <Sparkle size={24} weight="bold" className="" />
                    </button>
                  </button>
                </div>
                <button
                  className="add-work-pos-btn"
                  onClick={(e) => {
                    handleAddWork(i);
                  }}
                >
                  <ListPlus size={24} fill="#fff" />
                  Add Work
                </button>
              </div>
            );
          })}
        </div>
      )}
      {expandWork === 0 && (
        <div className="experiences-box experiences-box-collapsed">
          <div className="expand-work-box">
            <h3 className="heading-box">Work Experience Details</h3>
            <button className="expand-btn" onClick={handleExpandWork}>
              <ArrowsOut size={24} color="#fff" />
            </button>
            <ShowSectionBtn
              name="showWork"
              showSection={showSection}
              setShowSection={setShowSection}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkDetails;
