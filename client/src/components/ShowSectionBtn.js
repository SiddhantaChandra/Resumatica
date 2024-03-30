import React from 'react';
import '../styles/style-1.css';
import { Eye, EyeSlash } from '@phosphor-icons/react';

function ShowSectionBtn({ showSection, setShowSection, name }) {
  const handleChangeShow = () => {
    if (showSection[name] === 1)
      setShowSection((prev) => {
        const newObj = { ...prev };
        newObj[name] = 0;
        return newObj;
      });
    if (showSection[name] === 0)
      setShowSection((prev) => {
        const newObj = { ...prev };
        newObj[name] = 1;
        return newObj;
      });
  };

  return (
    <>
      {showSection[name] === 1 ? (
        <button className="show-section-btn">
          <Eye size={24} color="#fff" onClick={handleChangeShow} />
        </button>
      ) : (
        <button className="show-section-btn hide-section">
          <EyeSlash size={24} color="#fff" onClick={handleChangeShow} />
        </button>
      )}
    </>
  );
}

export default ShowSectionBtn;
