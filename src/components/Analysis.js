import React, { useState } from 'react';
import PieChart from 'react-simple-pie-chart';
import Excel from './Excel';
import Dashboard1 from './Dashboard1';
function Analysis({ response, resultText }) {
  const remainingValue = 10 - Number(response.ResumeScore);
  const value = Number(response.ResumeScore);

  const [showGeneratePage, setShowGeneratePage] = useState(0);
  // console.log(value, remainingValue);
  // console.log(response.Improvements);

  const generateResume = () => {
    setShowGeneratePage(1);
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
            <Dashboard1 response={response} />
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
