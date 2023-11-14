import React from 'react';
import logo from '../img/logo-2.png';
import githubLogo from '../img/github-logo.png';
import '../styles/navbar.css';

function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="nav-bar-logo">
        <div className="nav-logo__container">
          <a href="/" className="nav-logo">
            <img src={logo} alt="" className="nav-logo__img" />
            <h1 className="nav-logo__heading">resumatica</h1>
          </a>
        </div>
        <div className="nav-text-box">
          <p className="nav-text">Resume Analyser</p>
          <p className="nav-text">powered by GPT 3.5</p>
        </div>
      </div>
      <button className="cta-source">
        Source Code
        <img src={githubLogo} alt="Logo of Github" />
      </button>
    </nav>
  );
}

export default Navbar;
