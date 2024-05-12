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
import FAQPage from "./FAQ/FAQPage";
import FAQPage2 from "./FAQ/FAQPage2";
import ElecConsi from './ElectionConsituency/ElecConsi';
import AddCandi from './AddCandidate/AddCandi';
import ProfileEditVoter from './ProfileEditVoter/ProfileEditVoter';
import TrackVotes from './TrackVotes/TrackVotes';
import Voting from './ConductVoting/Voting';
import ConductBallotPage from './ConductBallotPage/ConductBallotPage';
import Result from './Result/Result';
import VotingConstituencyPage from './VotingCons/VotingConstituencyPage';

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
      <Route path="/faq" element={<FAQPage/>} />
      <Route path="/faq2" element={<FAQPage2/>} />
      <Route path="/elecconsi" element={<ElecConsi/>} />
      <Route path="/addcandi" element={<AddCandi/>} />
      <Route path="/profileeditvoter" element={<ProfileEditVoter/>} />
      <Route path="/trackvotes" element={<TrackVotes/>} />
      <Route path="/voting" element={<Voting/>} />
      <Route path="/conduct-ballot" element={<ConductBallotPage/>} />
      <Route path="/result" element={<Result/>} />
      <Route path="/votingCons" element={<VotingConstituencyPage/>} />
    </Routes>

  </Router>

  );
}

export default App;