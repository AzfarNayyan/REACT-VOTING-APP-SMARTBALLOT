import React from 'react';
import { Link } from 'react-router-dom'; 
import backgroundImage from './background.jpg';
import './RenderContent.css';

const RenderContent = () => {
  return (
    <div className="container">
      <img src={backgroundImage} alt="Background" className="background-image" />
      <h1 className="title">Welcome to SmartBallot</h1>
      <div className="options">
        <Link to="/signup" className="btn">SIGN UP</Link>
        <Link to="/login" className="btn">LOGIN</Link> 
      </div>
    </div>
  );
}

export default RenderContent;