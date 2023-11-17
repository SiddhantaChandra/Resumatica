import React, { useState } from 'react';
import PieChart from 'react-simple-pie-chart';
import Excel from './Excel';
function Analysis({ response, resultText }) {
  const remainingValue = 10 - Number(response.ResumeScore);
  const value = Number(response.ResumeScore);
  const [improvVisibility, setImprovVisibility] = useState(3);
  const [improvShowButton, setImprovShowButton] = useState(0);
  const [showGeneratePage, setShowGeneratePage] = useState(0);
  // console.log(value, remainingValue);
  // console.log(response.Improvements);

  const generateResume = () => {
    setShowGeneratePage(1);
  };

  if (response.Improvements.lenght <= 3) {
    setImprovShowButton(3);
  }

  const handleShowImprov = () => {
    setImprovVisibility(response.Improvements.lenght);
    setImprovShowButton(1);
  };
  const handleHideImprov = () => {
    setImprovVisibility(3);
    setImprovShowButton(0);
  };
  return (
    <>
      {showGeneratePage === 0 ? (
        <div>
          <div className="name-btn">
            <h1 className="a-name">Hey, {response.Name}</h1>
            <button onClick={generateResume} className="gen">
              Generate Excel &rarr;
            </button>
          </div>
          <div className="a-stats-box">
            <div className="a-careers a-box">
              <p className="a-text-primary element-with-gradient-border--3">
                Score - {value}/10
              </p>
              <div className="pie">
                <PieChart
                  slices={[
                    {
                      color: '#14efc5',
                      value: value,
                    },
                    {
                      color: '#de1b89',
                      value: remainingValue,
                    },
                  ]}
                />
              </div>
            </div>
            <div className="a-careers a-box">
              <p className="a-text-primary element-with-gradient-border">
                Career Paths
              </p>
              <div className="a-secondary-box">
                {response.SuggestedJobPositions.map((el, i) => (
                  <p key={i} className="a-text-secondary">
                    &#x2022; {el}
                  </p>
                ))}
              </div>
            </div>
            <div className="a-careers a-box">
              <p className="a-text-primary element-with-gradient-border--2">
                Things to Improve
              </p>
              <div className="a-secondary-box">
                {response.Improvements.slice(0, improvVisibility).map(
                  (el, i) => (
                    <>
                      <p key={i} className="a-text-secondary">
                        &#x2022; {el}
                      </p>
                    </>
                  ),
                )}
              </div>
              {improvShowButton === 0 ? (
                <button onClick={handleShowImprov} className="a-show-btn">
                  &dArr; Show More &dArr;
                </button>
              ) : (
                <></>
              )}
              {improvShowButton === 1 ? (
                <button onClick={handleHideImprov} className=" a-show-btn">
                  &uArr; Show Less &uArr;
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Excel response={response} />
        </>
      )}
    </>
  );
}

export default Analysis;
