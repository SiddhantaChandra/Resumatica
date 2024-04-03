import React, { useState } from 'react';
import '../styles/project.css';
import {
  ArrowsIn,
  ArrowsOut,
  CaretUp,
  CaretDown,
  Trash,
  ListPlus,
  ArrowsClockwise,
} from '@phosphor-icons/react';
import ShowSectionBtn from './ShowSectionBtn';
import { toast, Bounce } from 'react-toastify';

function Projects({ parseData, setParseData, setShowSection, showSection }) {
  const [projects, setProjects] = useState(() => {
    return parseData.project
      ? parseData.project
      : [
          {
            projectname: null,
            description: null,
            technologiesused: null,
          },
        ];
  });
  const [expandProject, setExpandProject] = useState(1);

  const handleUpdateProjects = () => {
    setParseData((prev) => {
      const newObj = { ...prev };
      newObj.project = projects;
      console.log(newObj);
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

  const handleProjectsChange = (index, name, value) => {
    setProjects((prev) => {
      const newArr = [...prev];
      newArr[index][name] = value;

      return newArr;
    });
  };
  const handleExpandProject = () => {
    if (expandProject === 1) setExpandProject(0);
    if (expandProject === 0) setExpandProject(1);
  };

  const handleDeleteProject = (index) => {
    setProjects((prev) => {
      let newArr = [...prev];
      newArr = newArr.filter((el, i) => {
        return i !== index;
      });
      return newArr;
    });
  };

  const handleIndexIncrease = (index) => {
    setProjects((prev) => {
      const newArr = [...prev];
      const up = newArr[index];
      const down = newArr[index - 1];
      newArr[index] = down;
      newArr[index - 1] = up;
      return newArr;
    });
  };
  const handleIndexDecrease = (index) => {
    setProjects((prev) => {
      const newArr = [...prev];
      const down = newArr[index];
      const up = newArr[index + 1];
      newArr[index + 1] = down;
      newArr[index] = up;
      return newArr;
    });
  };

  const handleAddProject = (i) => {
    setProjects((prev) => {
      const newArr = [...prev];
      newArr.splice(i + 1, 0, {
        projectname: null,
        description: null,
        technologiesused: null,
      });
      return newArr;
    });
  };

  return (
    <section className="section-projects">
      <div className="projects-heading-box">
        <h3 className="heading-box">Projects</h3>
        {expandProject === 1 ? (
          <>
            <button className="expand-btn" onClick={handleExpandProject}>
              <ArrowsIn size={24} color="#fff" />
            </button>
            <ShowSectionBtn
              name="Projects"
              showSection={showSection}
              setShowSection={setShowSection}
            />
            <button
              className="update-button m-25"
              onClick={handleUpdateProjects}
            >
              <ArrowsClockwise size={24} />
              Update
            </button>
          </>
        ) : (
          <>
            <button className="expand-btn" onClick={handleExpandProject}>
              <ArrowsOut size={24} color="#fff" />
            </button>
            <ShowSectionBtn
              name="Projects"
              showSection={showSection}
              setShowSection={setShowSection}
            />
          </>
        )}
      </div>
      {expandProject === 1 ? (
        <div className="projects-container">
          {projects.map((el, i, arr) => {
            return (
              <div className="project-container">
                <div className="project-name-box">
                  <div className="proj-label-btn-box">
                    <label className="label">Project {i + 1}</label>
                    <div className="proj-button-box">
                      {i === 0 && arr.length > 1 && (
                        <button
                          className="work-up-btn"
                          onClick={(e) => handleIndexDecrease(i)}
                        >
                          <CaretDown size={24} weight="bold" color="#fff" />
                        </button>
                      )}
                      {i === arr.length - 1 && arr.length > 1 && (
                        <button
                          className="work-up-btn"
                          onClick={(e) => handleIndexIncrease(i)}
                        >
                          <CaretUp size={24} weight="bold" color="#fff" />
                        </button>
                      )}
                      {i > 0 && i < arr.length - 1 && (
                        <>
                          <button
                            className="work-up-btn"
                            onClick={(e) => handleIndexIncrease(i)}
                          >
                            <CaretUp size={24} weight="bold" color="#fff" />
                          </button>
                          <button
                            className="work-up-btn"
                            onClick={(e) => handleIndexDecrease(i)}
                          >
                            <CaretDown size={24} weight="bold" color="#fff" />
                          </button>
                        </>
                      )}
                      {arr.length === 1 ? (
                        <></>
                      ) : (
                        <button
                          className="work-up-btn trash"
                          onClick={(e) => handleDeleteProject(i)}
                        >
                          <Trash size={20} color="#fff" />
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    name="projectname"
                    className="input proj-input"
                    placeholder="Stack OverFlow Clone"
                    value={el.projectname}
                    onChange={(e) =>
                      handleProjectsChange(i, e.target.name, e.target.value)
                    }
                  />
                </div>
                <div className="project-desc-box">
                  <label className="label">Description </label>
                  <textarea
                    name="description"
                    className="input proj-input textarea-projects"
                    placeholder="Developed a full-stack web application inspired by Stack Overflow, utilizing modern technologies. Users can post questions, provide answers, and engage in discussions, fostering a collaborative community environment."
                    value={el.description}
                    onChange={(e) =>
                      handleProjectsChange(i, e.target.name, e.target.value)
                    }
                  />
                </div>
                <div className="project-desc-box">
                  <label className="label">Tech </label>
                  <input
                    name="technologiesused"
                    className="input proj-input"
                    placeholder="React, Node.js, Express, MongoDB, and WebSockets"
                    value={el.technologiesused}
                    onChange={(e) =>
                      handleProjectsChange(i, e.target.name, e.target.value)
                    }
                  />
                </div>
                <button
                  className=" add-education-btn"
                  onClick={(e) => handleAddProject(i)}
                >
                  <ListPlus size={24} color="#fff" />
                  Add Project
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}

export default Projects;
