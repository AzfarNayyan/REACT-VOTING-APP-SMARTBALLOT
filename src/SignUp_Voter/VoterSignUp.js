import React, { useState } from 'react';
import './VoterSignUp.css';
import axios from 'axios';

const VoterSignUp = () => {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const cnic = form['cnic'].value;
    const name = form['name'].value;
    const email = form['email'].value;
    const password = form['password'].value;
    const address = form['address'].value;
    const dob = form['dob'].value;


    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }


    if (age < 18) {
      setMessage('You must be at least 18 years old to sign up.');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setMessage('');
      }, 5000); 
      return;
    }

    try {
     
      const existsResponse = await axios.post('http://localhost:5501/checkVoterExistence', { cnic, email });
      if (existsResponse.data.exists) {
        setMessage('Voter account with provided CNIC or email already exists.');
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setMessage('');
        }, 5000); 
        return;
      }

      const signUpResponse = await axios.post('http://localhost:5501/voterSignUp', { cnic, name, email, password, address });
      setMessage(signUpResponse.data);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setMessage('');
      }, 5000); 
    } catch (error) {
      console.error('Error signing up voter:', error);
      setMessage('Error signing up voter. Please try again later.');
    }
  };
  
  return (
    <div className="signup-container">
      <h1 className="title-signup">Welcome to SmartBallot</h1>
      <div className="signup-box-v">
        <h2>Voter Sign Up</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="signup-form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        {showMessage && (
          <div className="message-popup">
            <p>{message}</p>
          </div>
        )}
        {showSuccessMessage && (
          <div className="message-popup">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoterSignUp;