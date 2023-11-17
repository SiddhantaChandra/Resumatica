import React from 'react';

function Careers({ handlePath, response, selectedpath }) {
  return (
    <div>
      <h4 className="d-subhead">Career Paths</h4>
      <div className="d-careers">
        {response.SuggestedJobPositions.map((el, i) => {
          return (
            <button
              className={selectedpath === el ? 'd-career-selected' : 'd-career'}
              onClick={() => handlePath(el)}
              key={`Jobs` + i}
            >
              {el}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Careers;
