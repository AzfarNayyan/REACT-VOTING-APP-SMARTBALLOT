import React from 'react';
import { Link } from 'react-router-dom'; 
import backgroundImage from './background.jpg';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="container">
      <img src={backgroundImage} alt="Background" className="background-image" />
      <h1 className="title">Welcome to SmartBallot</h1>
      <h2 className='title2'>Sign Up</h2>
      <div className="options">
        <Link to="/adminsignup" className="btn">ADMIN</Link>
        <Link to="/votersignup" className="btn">VOTER</Link> 
      </div>
    </div>
  );
}

export default SignUp;