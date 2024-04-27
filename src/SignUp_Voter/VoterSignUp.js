import React from 'react';
import './VoterSignUp.css';

const VoterSignUp = () => {
  return (
    <div className="signup-container">
      <h1 className="title-signup">Welcome to SmartBallot</h1>
      <div className="signup-box-v">
        <h2>Voter Sign Up</h2>
        <form>
          <div className="signup-form-group">
            <label htmlFor="cnic">CNIC:</label>
            <input type="text" id="cnic" name="cnic" />
          </div>
          <div className="signup-form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="signup-form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="signup-form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="signup-form-group">
            <label htmlFor="address">Address:</label>
            <input type="address" id="address" name="address" />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default VoterSignUp;