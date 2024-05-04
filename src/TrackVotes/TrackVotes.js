

import React, { useState } from "react";
import { Link } from "react-router-dom";
import './TrackVotes.css';

const TrackVotes = () => {
    const [voterCNIC, setVoterCNIC] = useState('');
    const [candidateDetails, setCandidateDetails] = useState([]);

    const handleTrackVotes = async () => {
        try {
            const response = await fetch('http://localhost:5501/trackVotesByCNIC', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ voterCNIC })
            });
            const data = await response.json();
            setCandidateDetails(data);
        } catch (error) {
            console.error('Error tracking votes:', error);
        }
    };

    return (
        <div className="voter-main-container1">
            <nav className="top-nav">
                <ul>
                    <li><Link to="/votermainpage"><button>Home</button></Link></li>
                    <li><Link to="/votingCons"><button>Voting Constituencies</button></Link></li>
                    <li><button>Track Your Votes</button></li>
                    <li><Link to="/profileeditvoter"><button>Profile Update</button></Link></li>
                    <li><Link to="/faq"><button>FAQ</button></Link></li>
                </ul>
            </nav>
            <div className="track-votes-container">
                <h2>Track Your Votes</h2>
                <input type="text" placeholder="Enter CNIC" value={voterCNIC} onChange={e => setVoterCNIC(e.target.value)} />
                <button onClick={handleTrackVotes}>Track Votes</button>
                {candidateDetails.length > 0 && (
                    <div className="candidate-details-container1">
                        <h3>Voting Details:</h3>
                        <ul>
                            {candidateDetails.map(candidate => (
                                <li key={candidate.CandidateID}>
                                    <p>ID: {candidate.CandidateID}</p>
                                    <p>Candidate Name: {candidate.Name}</p>
                                    <p>Party Affiliation: {candidate.PartyAffiliation}</p>
                                    <p>Bio: {candidate.Bio}</p>
                                    <p>Constituency: {candidate.ConstituencyName}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <footer className="bottom-bar7">
                <p>© github.com/AzfarNayyan.</p>
            </footer>
        </div>
    );
}

export default TrackVotes;