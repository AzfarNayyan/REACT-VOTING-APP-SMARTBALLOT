import React from 'react';
import { Link } from 'react-router-dom'; 
import backgroundImage from './background.jpg';
import './login.css';

const Login = () => {
  return (
    <div className="container">
      <img src={backgroundImage} alt="Background" className="background-image" />
      <h1 className="title">Welcome to SmartBallot</h1>
      <h2 className='title2'>Login</h2>
      <div className="options">
        <Link to="/adminlogin" className="btn">ADMIN</Link>
        <Link to="/voterlogin" className="btn">VOTER</Link> 
      </div>
    </div>
  );
}

export default Login;