

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './ConductBallotPage.css';

const ConductBallotPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const constituencyID = searchParams.get('constituencyID');
    const time = searchParams.get('time');

    const [candidates, setCandidates] = useState([]);
    const [timer, setTimer] = useState(parseInt(time));
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [voterCNIC, setVoterCNIC] = useState('');
    const [voterPassword, setVoterPassword] = useState('');
    const [voteAdded, setVoteAdded] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    useEffect(() => {
 
        fetchCandidatesByConstituencyID();
    }, []);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);


        if (timer === 0) {
            clearInterval(countdown);

            window.location.href = `/result?constituencyID=${constituencyID}&time=${time}`;
        }

        return () => clearInterval(countdown);
    }, [timer, constituencyID, time]);

    const fetchCandidatesByConstituencyID = async () => {
        try {
            const response = await fetch('http://localhost:5501/getCandidatesByConstituencyID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ constituencyID })
            });
            const data = await response.json();
            setCandidates(data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    const handleVote = async () => {
        try {
            if (!selectedCandidate) {
                alert('Please select a candidate to vote.');
                return;
            }

            const response = await fetch('http://localhost:5501/validateVoter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ voterCNIC, voterPassword })
            });
            const data = await response.json();

            if (data.valid) {
                const voteResponse = await fetch('http://localhost:5501/recordVote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ voterCNIC, candidateID: selectedCandidate.CandidateID })
                });

                if (voteResponse.ok) {
                    setVoteAdded(true);
                    setValidationMessage('');
                } else {
                    setValidationMessage('Failed to record vote. Please try again.');
                }
            } else {
                setValidationMessage('Invalid CNIC or password. Please try again.');
            }
        } catch (error) {
            console.error('Error voting:', error);
            setValidationMessage('An error occurred while processing your vote. Please try again later.');
        }
    };

    return (
        <div className="conduct-ballot-container">
            <h2>Conducting Ballot for Constituency {constituencyID}...</h2>
            <p className="timer">Time Remaining: {timer} seconds</p>
            <div className="candidates-container">
                {candidates.map(candidate => (
                    <div className="candidate-details" key={candidate.CandidateID}>
                        <h3>{candidate.Name}</h3>
                        <p>Party Affiliation: {candidate.PartyAffiliation}</p>
                        <p>Bio: {candidate.Bio}</p>
                        <button className="vote-button" onClick={() => setSelectedCandidate(candidate)}>Vote</button>
                    </div>
                ))}
            </div>
            <div className="vote-form">
                <input type="text" placeholder="Enter CNIC" value={voterCNIC} onChange={e => setVoterCNIC(e.target.value)} />
                <input type="password" placeholder="Enter Password" value={voterPassword} onChange={e => setVoterPassword(e.target.value)} />
                <button onClick={handleVote}>Submit Vote</button>
            </div>
            {validationMessage && <p className="validation-message">{validationMessage}</p>}
            {voteAdded && <p className="vote-success-message">Vote Added Successfully!</p>}
        </div>
    );
}

export default ConductBallotPage;