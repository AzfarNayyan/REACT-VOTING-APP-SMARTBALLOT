import React from 'react';
import { Link } from 'react-router-dom'; 
import backgroundImage from './background.jpg';
import './RenderContent.css';

const RenderContent = () => {
  return (
    <div className="container">
      <div className="top-bar1">
        <h2 className="top-bar-text1">WELCOME TO SMART BALLOT</h2>
      </div>
      <img src={backgroundImage} alt="Background" className="background-image" />
      <h1 className="title1">Welcome to SmartBallot</h1>
      <div className="options">
        <Link to="/signup" className="btn">SIGN UP</Link>
        <Link to="/login" className="btn">LOGIN</Link> 
      </div>
    </div>
  );
}

export default RenderContent;