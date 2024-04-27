import React from 'react';
import './AdminLogin.css';

const AdminLogin = () => {
  return (
    <div className="signup-container">
      <h1 className="title-signup">Welcome to SmartBallot</h1>
      <div className="signup-box-Lo">
        <h2>Admin Login</h2>
        <form>
          <div className="signup-form-group">
            <label htmlFor="cnic">CNIC:</label>
            <input type="text" id="cnic" name="cnic" />
          </div>
          <div className="signup-form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit" className="signup-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;