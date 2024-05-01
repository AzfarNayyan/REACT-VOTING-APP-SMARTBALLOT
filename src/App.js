import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import React, { useState } from "react";
import './App.css';
import RenderContent from './SignUpLogin/RenderContent';
import SignUp from './signup/SignUp'
import Login from './login/Login';
import AdminSignUp from './SignUp_Admin/AdminSignUp';
import VoterSignUp from './SignUp_Voter/VoterSignUp';
import VoterLogin from './Login_Voter/VoterLogin';
import AdminLogin from './Login_Admin/AdminLogin';
import VoterMain from "./Voter_MainPage/VoterMain";
import AdminMain from "./Admin_MainPage/AdminMain";

const App = () => {
  return (

  <Router>

    <Routes>
      <Route path="/" element={<RenderContent />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/adminsignup" element={<AdminSignUp/>} />
      <Route path="/votersignup" element={<VoterSignUp/>} />
      <Route path="/voterlogin" element={<VoterLogin/>} />
      <Route path="/adminlogin" element={<AdminLogin/>} />
      <Route path="/votermainpage" element={<VoterMain/>}/>
      <Route path="/adminmainpage" element={<AdminMain/>} />
    </Routes>

  </Router>


  );
}

export default App;