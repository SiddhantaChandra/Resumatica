import React, { useState } from 'react';
import '../styles/info.css';
import '../styles/sumarry.css';
import { ArrowsOut, ArrowsIn, Sparkle } from '@phosphor-icons/react';
import LoadingIcon from '../img/icons/grey-9026_128.gif';
import ShowSectionBtn from '../components/ShowSectionBtn';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { Bounce, toast } from 'react-toastify';

function Summary({ parseData, setParseData, showSection, setShowSection }) {
  const [summary, setSummary] = useState(parseData.summary);

  // console.log(summary);
  const [summaryExpand, setSummaryExpand] = useState(0);
  const [isSummaryLoading, setIsSummaryLoading] = useState(0);
  const handleChangeSummary = (e) => {
    setSummary((prev) => {
      let newObj = prev;
      newObj = e.target.value;
      return newObj;
    });
  };

  const handleUpdateInfo = () => {
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
    setParseData((prev) => {
      const newObj = { ...prev };
      newObj.summary = summary;
      return newObj;
    });
  };

  const handleExpandSummary = (e) => {
    if (summaryExpand === 0) setSummaryExpand(1);
    if (summaryExpand === 1) setSummaryExpand(0);
  };

  const handleImproveSummary = () => {
    // if (!parseData.summary) return;
    // if (parseData.summary.length < 50) return;

    setIsSummaryLoading(1);
    fetch('/improve-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: parseData.summary,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.answer);
        setParseData((prev) => {
          const newObj = { ...prev };
          newObj.summary = data.answer;
          setIsSummaryLoading(0);
          return newObj;
        });
        setSummary((prev) => {
          let newObj = prev;
          newObj = data.answer;
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
      });
    // console.log(parseData.summary.length);
  };
  return (
    <div className="summary-container">
      {summaryExpand === 0 && (
        <>
          <div className="heading-button-cont">
            <h3 className="heading-box heading-summary">Summary</h3>
            <button className="expand-btn" onClick={handleExpandSummary}>
              <ArrowsIn size={24} color="#fff" />
            </button>
            <ShowSectionBtn
              name="showSummary"
              showSection={showSection}
              setShowSection={setShowSection}
            />
            <button className="update-button m-24" onClick={handleUpdateInfo}>
              <ArrowsClockwise size={24} />
              Update
            </button>
          </div>
          {isSummaryLoading === 1 ? (
            <div className="summary-text-btn-box disabled-div">
              <textarea
                className="input text-area"
                value={summary}
                onChange={handleChangeSummary}
                disabled="true"
              />
              <button
                className="improve-res-btn disabled-btn"
                onClick={handleImproveSummary}
                disabled={true}
              >
                <img src={LoadingIcon} alt="Loading Gif" />
              </button>
            </div>
          ) : (
            <div className="summary-text-btn-box">
              <textarea
                placeholder="Write something that describes you and what you bring to the table, and press the magic button beside!"
                className="input text-area"
                value={summary}
                onChange={handleChangeSummary}
              />
              <button
                className="improve-res-btn"
                onClick={handleImproveSummary}
              >
                <Sparkle size={24} weight="bold" className="improve-res-btn" />
              </button>
            </div>
          )}
        </>
      )}
      {summaryExpand === 1 && (
        <>
          <div className="heading-button-cont">
            <h3 className="heading-box heading-summary">Summary</h3>
            <button className="expand-btn" onClick={handleExpandSummary}>
              <ArrowsOut size={24} color="#fff" />
            </button>
            <ShowSectionBtn
              name="showSummary"
              showSection={showSection}
              setShowSection={setShowSection}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Summary;
