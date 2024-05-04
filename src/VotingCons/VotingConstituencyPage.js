import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 
import './VC.css';

function VotingConstituencyPage() {
  const [constituencies, setConstituencies] = useState([]);

  useEffect(() => {
    async function fetchConstituencies() {
      try {
        const response = await axios.get('http://localhost:5501/constituencies');
        setConstituencies(response.data);
      } catch (error) {
        console.error('Error fetching constituencies:', error);
      }
    }

    fetchConstituencies();
  }, []);

  return (
    <div>
      <nav className="top-nav">
        <ul>
          <li><Link to="/votermainpage"><button>Home</button></Link></li>
          <li><Link to="/votingCons"><button>Voting Constituencies</button></Link></li>
          <li><Link to="/trackvotes"><button>Track Your Votes</button></Link></li>
          <li><Link to="/profileeditvoter"><button>Profile Update</button></Link></li>
          <li><Link to="/faq"><button>FAQ</button></Link></li> 
        </ul>
      </nav>
      <h1 className="consTitle">Constituency Details: </h1>
      <ul className="constituency-details">
  {constituencies.map(constituency => (
    <li key={constituency.ConstituencyID}>
      <span className="constituency-id">Constituency ID:</span>
      <span className="constituency-name">{constituency.ConstituencyID}</span>
      <span className="constituency-id">. Constituency Name:</span>
      <span className="constituency-name">{constituency.ConstituencyName}.</span>
    </li>
  ))}
</ul>

      <footer className="bottom-bar7">
        <p>© github.com/AzfarNayyan.</p>
      </footer>
    </div>
  );
}

export default VotingConstituencyPage;