import React from 'react';
import '../styles/work.css';
import { Sparkle } from '@phosphor-icons/react';

function ImproveRes({ respon, indexOfRespon, indexOfWork, setExperience }) {
  const handleExpResChange = (value, index) => {
    setExperience((prev) => {
      const newArray = [...prev];
      newArray[indexOfWork] = {
        ...newArray[indexOfWork],
        responsibilities: newArray[indexOfWork].responsibilities.map((res, i) =>
          i === indexOfRespon ? value : res,
        ),
      };
      return newArray;
    });
  };

  const handleImproveRespon = () => {
    // console.log(respon, indexOfRespon, respon.length);
    fetch('/improve-reponsibility', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: respon,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.answer);
        handleExpResChange(data.answer, indexOfRespon);
      });
  };
  return (
    <button className="improve-res-btn" onClick={(e) => handleImproveRespon()}>
      <Sparkle size={24} weight="bold" className="improve-res-btn" />
    </button>
  );
}

export default ImproveRes;
