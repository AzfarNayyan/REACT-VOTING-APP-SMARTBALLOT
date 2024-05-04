

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ResultPage.css";

const ResultPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const constituencyID = searchParams.get('constituencyID');

    const [constituencyDetails, setConstituencyDetails] = useState({});
    const [candidates, setCandidates] = useState([]);
    const [winner, setWinner] = useState({});

    useEffect(() => {
        fetchResultData();
    }, []);

    const fetchResultData = async () => {
        try {
          
            const constituencyResponse = await fetch('http://localhost:5501/getConstituencyDetailsByID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ constituencyID })
            });
            const constituencyData = await constituencyResponse.json();
            setConstituencyDetails(constituencyData);

          
            const candidatesResponse = await fetch('http://localhost:5501/getCandidatesByConstituencyID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ constituencyID })
            });
            const candidatesData = await candidatesResponse.json();
            setCandidates(candidatesData);

          
            const candidatesWithVoteCount = await Promise.all(candidatesData.map(async candidate => {
                const voteCountResponse = await fetch('http://localhost:5501/getVoteCountByCandidateID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ candidateID: candidate.CandidateID })
                });
                const voteCountData = await voteCountResponse.json();
                return { ...candidate, VoteCount: voteCountData.count };
            }));

            setCandidates(candidatesWithVoteCount);

           
            const winnerCandidate = candidatesWithVoteCount.reduce((prev, current) => (prev.VoteCount > current.VoteCount) ? prev : current);
            setWinner(winnerCandidate);
        } catch (error) {
            console.error('Error fetching result data:', error);
        }
    };

    return (
        <div className="container1">
            <div className="result-box1">
                <h2 className="result-title1">Result for Constituency:  {constituencyDetails.ConstituencyName}</h2>
                <h3 className="result-title1">ID: {constituencyID} </h3>
                {winner && 
                    <p className="winner-info1">
                        The winner of the election is: {winner.Name}. PartyAffiliation: ({winner.PartyAffiliation}).
                        Vote Count: {winner.VoteCount}
                    </p>
                }

                <h3 className="result-title1">Candidate Details:</h3>
                <ul className="candidate-list1">
                    {candidates.map(candidate => (
                        <li key={candidate.CandidateID} className="candidate-item1">
                            <span>Candidate Name: {candidate.Name}</span><br />
                            <span>Party Affiliation: ({candidate.PartyAffiliation})</span><br />
                            <span>Vote Count: {candidate.VoteCount}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ResultPage;
