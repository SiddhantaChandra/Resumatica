import React, { useState } from 'react';
import { ArrowsIn, ArrowsOut, ArrowsClockwise } from '@phosphor-icons/react';
import '../styles/info.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast, Bounce } from 'react-toastify';
import DisplayPhoto from './DisplayPhoto';

function InfoDetails({ parseData, setParseData }) {
  // console.log(parseData.linkedIn);
  const [name, setName] = useState(parseData.name);
  const [phone, setPhone] = useState(parseData.phone);
  const [address, setAddress] = useState(parseData.homeaddress);
  const [email, setEmail] = useState(parseData.email);
  const [inputFile, setInputFile] = useState(null);
  const [linkedIn, setLinkedIn] = useState(parseData.linkedin);
  const [personalExpand, setPersonalExpand] = useState(1);

  const handleUpdateInfo = () => {
    setParseData((prev) => {
      prev = {
        ...prev,
        name: name,
        phone: phone,
        email: email,
        linkedin: linkedIn,
        homeaddress: address,
      };
      return prev;
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

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleLinkedInChange = (event) => {
    setLinkedIn(event.target.value);
  };

  const handleExpandPersonal = () => {
    if (personalExpand === 0) setPersonalExpand(1);
    if (personalExpand === 1) setPersonalExpand(0);
  };

  return (
    <div>
      {personalExpand === 1 && (
        <div className="personal-details-box-container">
          <div className="expand-heading-box expand-heading-box-personal">
            <h3 className="heading-box">Personal Details</h3>
            <button className="expand-btn" onClick={handleExpandPersonal}>
              <ArrowsIn size={24} color="#fff" />
            </button>
            <button className="update-button m-23" onClick={handleUpdateInfo}>
              <ArrowsClockwise size={24} />
              Update
            </button>
          </div>
          <form className="personal-details-box">
            <div className="info-box">
              <label className="label">Name</label>
              <input
                className="input"
                value={name}
                onChange={handleChangeName}
                placeholder="Jane Doe"
              />
            </div>
            <div className="input-phn-email">
              <div className="info-box">
                <label className="label">Email</label>
                <input
                  placeholder="janedoe@info.com"
                  className="input input-email"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
              <div className="info-box">
                <label className="label">Mobile</label>
                <input
                  placeholder="+12 34567 89101"
                  className="input mobile-input"
                  value={phone}
                  onChange={handleChangePhone}
                />
              </div>
            </div>
            <div className="info-box">
              <label className="label" value={linkedIn}>
                LinkedIn
              </label>
              <input
                placeholder="jane-doe-618bba58"
                className="input"
                value={linkedIn}
                onChange={handleLinkedInChange}
              />
            </div>
            <div className="info-box">
              <label className="label">Address</label>
              <input
                placeholder="East New York"
                className="input "
                value={address}
                onChange={handleChangeAddress}
              />
            </div>
            <DisplayPhoto
              inputFile={inputFile}
              setInputFile={setInputFile}
              setParseData={setParseData}
            />
          </form>
        </div>
      )}
      {personalExpand === 0 && (
        <div className="personal-details-box-container">
          <div className="expand-heading-box expand-heading-box-personal">
            <h3 className="heading-box">Personal Details</h3>
            <button className="expand-btn" onClick={handleExpandPersonal}>
              <ArrowsOut size={24} color="#fff" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoDetails;
