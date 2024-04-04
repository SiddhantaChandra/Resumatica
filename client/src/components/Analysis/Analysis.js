import React from 'react';
import './analysis.css';
import { DNA } from 'react-loader-spinner';

function Analysis({
  careerPaths,
  isALoading,
  setCareerPaths,
  setisALoading,
  parseData,
}) {
  const handleRefresh = () => {
    setisALoading(1);
    fetch('/career-suggestion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parseData),
    })
      .then((res) => res.json())
      .then((data) => setCareerPaths(data.Course));

    setisALoading(0);
  };

  return (
    <div>
      {isALoading === 0 && careerPaths ? (
        <div className="career-paths">
          {careerPaths.map((el, i) => {
            return (
              <div className="career-path-box">
                <h4 className="cp-name">
                  {i + 1}. {el.name}
                </h4>
                <p className="cp-text">
                  <strong>Rationale:</strong> {el.rationale}
                </p>
                <p className="cp-text">
                  <strong>Benefits:</strong> {el.benefits}
                </p>
              </div>
            );
          })}
          <button className="refresh" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      ) : (
        <div className="career-paths cp-loading">
          <DNA
            visible={true}
            height="300"
            width="300"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
    </div>
  );
}

export default Analysis;
