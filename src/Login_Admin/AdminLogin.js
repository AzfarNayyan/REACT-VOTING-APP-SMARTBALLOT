import React, { useState } from 'react';
import './AdminLogin.css';
import axios from 'axios';

const AdminLogin = () => {
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const loginResponse = await axios.post('http://localhost:5501/adminLogin', { cnic, password });
      
    
      if (loginResponse.data.success) {
     
        setMessage('Login successful!');
        setShowMessage(true);
       
        window.location.href = '/adminmainpage'; 
      } else {
        
        setMessage('Invalid CNIC or password. Please try again.');
        setShowMessage(true);
      }
    } catch (error) {
      console.error('Error logging in admin:', error);
     
      setMessage('Error logging in admin. Please try again later.');
      setShowMessage(true);
    }
  };
  
  return (
    <div className="signup-container">
      <h1 className="title-signup">Welcome to SmartBallot</h1>
      <div className="signup-box-Lo">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="signup-form-group">
            <label htmlFor="cnic">CNIC:</label>
            <input type="text" id="cnic" name="cnic" value={cnic} onChange={(e) => setCnic(e.target.value)} />
          </div>
          <div className="signup-form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="signup-btn">Login</button>
        </form>
        {showMessage && (
          <div className="message-popup">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
