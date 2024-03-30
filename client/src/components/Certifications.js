import React, { useState } from 'react';
import {
  ArrowsIn,
  ArrowsOut,
  Trash,
  ListPlus,
  ArrowsClockwise,
} from '@phosphor-icons/react';
import '../styles/cert-skills.css';
import ShowSectionBtn from './ShowSectionBtn';

function Certifications({
  parseData,
  setParseData,
  showSection,
  setShowSection,
}) {
  const [certifications, setCertifications] = useState(() => {
    return parseData.certifications
      ? parseData.certifications
      : [{ certificatename: '', institutename: '' }];
  });
  const [expandCert, setExpandCert] = useState(1);

  console.log(certifications);

  const handleExpandCert = () => {
    if (expandCert === 0) setExpandCert(1);
    if (expandCert === 1) setExpandCert(0);
  };

  const handleUpdateCert = () => {
    setParseData((prev) => {
      const newObj = { ...prev };
      newObj.certifications = certifications;
      return newObj;
    });
  };

  const handleIndexCert = (i) => {
    setCertifications((prev) => {
      let newArr = [...prev];
      newArr = newArr.filter((el, index) => index !== i);
      return newArr;
    });
  };
  const handleAddCert = () => {
    setCertifications((prev) => {
      const newArr = [...prev];
      newArr.push([{ certificatename: '', institutename: '' }]);
      return newArr;
    });
  };

  const handleChangeCert = (index, value) => {
    setCertifications((prev) => {
      const newArr = [...prev];
      console.log(newArr);
      newArr[index] = { certificatename: value };
      return newArr;
    });
  };

  return (
    <section className="section-certifications">
      <div className="cert-heading-box">
        <h3 className="heading-box">Certifications</h3>
        {expandCert === 1 ? (
          <>
            <button className="expand-btn" onClick={handleExpandCert}>
              <ArrowsIn size={24} color="#fff" />
            </button>
            <ShowSectionBtn
              name="showCert"
              showSection={showSection}
              setShowSection={setShowSection}
            />
            <button className="update-button m-22" onClick={handleUpdateCert}>
              <ArrowsClockwise size={24} />
              Update
            </button>
          </>
        ) : (
          <>
            <button className="expand-btn" onClick={handleExpandCert}>
              <ArrowsOut size={24} color="#fff" />
            </button>
            <ShowSectionBtn
              name="showCert"
              showSection={showSection}
              setShowSection={setShowSection}
            />
          </>
        )}
      </div>
      {expandCert === 1 ? (
        <div className="cert-input-fields">
          {certifications.map((el, i, arr) => {
            return (
              <div className="cert-input-del-box">
                <textarea
                  placeholder="Google Professional Cloud Developer Certificate"
                  className="input cert-input"
                  value={el.certificatename}
                  onChange={(e) => handleChangeCert(i, e.target.value)}
                />
                {i === 0 && arr.length < 2 ? (
                  <></>
                ) : (
                  <button
                    className="work-up-btn trash"
                    onClick={(e) => handleIndexCert(i)}
                  >
                    <Trash size={20} color="#fff" />
                  </button>
                )}
              </div>
            );
          })}
          <button
            className=" add-education-btn"
            onClick={(e) => handleAddCert()}
          >
            <ListPlus size={24} color="#fff" />
            Add Certifications
          </button>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}

export default Certifications;
