import React from 'react';
import logo from '../img/logo-2.png';
import githubLogo from '../img/github-logo.png';

function Navbar() {
  return (
    <div className="navbar ml-10">
      <div className="nav-logo-left__wrapper">
        <div className="nav-logo-box">
          <img src={logo} alt="Logo" className="logo-nav__header" />
          <h1 className="logo-nav__primary-text">resumatica</h1>
        </div>
        <div className="nav-logo-secondary-box">
          <h3>Resume Analyzer</h3>
          <p>powered by GPT</p>
        </div>
      </div>
      <button className="nav-source-code-btn">
        <img src={githubLogo} alt="Github logo" />
        <p>Source Code</p>
      </button>
    </div>
  );
}

export default Navbar;
