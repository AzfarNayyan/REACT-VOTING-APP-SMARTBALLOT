import React, { useState } from "react";
import './AddCandi.css';
import { Link } from "react-router-dom";
import axios from 'axios';

const AddCandi = () => {
    const [candidateName, setCandidateName] = useState("");
    const [partyAffiliation, setPartyAffiliation] = useState("");
    const [bio, setBio] = useState("");
    const [constituencyName, setConstituencyName] = useState("");
    const [candidateID, setCandidateID] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const constituencyCheck = await axios.post('http://localhost:5501/checkConstituencyExistence', { constituencyName });
            if (!constituencyCheck.data.exists) {
                setMessage("Constituency does not exist.");
                return;
            }

            const candidateCheck = await axios.post('http://localhost:5501/checkCandidateExistenceByID', { candidateID });
            if (candidateCheck.data.exists) {
                setMessage("Candidate already exists.");
                return;
            }

            const addCandidate = await axios.post('http://localhost:5501/addCandidate', {  candidateName, partyAffiliation, bio, constituencyName, candidateID });
            setMessage(addCandidate.data.message);
        } catch (error) {
            console.error(error);
            setMessage("Internal Server Error");
        }
    };

    return (
        <div>
            <nav className="top-nav">
                <ul>
                    <li><Link to="/adminmainpage"><button>Home</button></Link></li>
                    <li><Link to="/elecconsi"><button>Add Election Constituency</button></Link></li>
                    <li><button>Add Candidate</button></li>
                    <li><Link to="/voting"><button>Conduct Voting</button></Link></li>
                    <li><Link to="/faq2"><button>FAQ</button></Link></li>
                </ul>
            </nav>
            <form className="main-content" onSubmit={handleSubmit}>
                <div className="form-group1">
                    <label>Candidate ID:</label>
                    <input type="number" value={candidateID} onChange={(e) => setCandidateID(e.target.value)} required />
                </div>
                <div className="form-group1">
                    <label>Candidate Name:</label>
                    <input type="text" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} required />
                </div>
                <div className="form-group1">
                    <label>Party Affiliation:</label>
                    <input type="text" value={partyAffiliation} onChange={(e) => setPartyAffiliation(e.target.value)} required />
                </div>
                <div className="form-group1">
                    <label>Bio:</label>
                    <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} required />
                </div>
                <div className="form-group1">
                    <label>Constituency Name:</label>
                    <input type="text" value={constituencyName} onChange={(e) => setConstituencyName(e.target.value)} required />
                </div>
                <button type="submit">Add Candidate</button>
            </form>
            {message && <div className="message1">{message}</div>}
            <footer className="bottom-bar3">
                <p>© github.com/AzfarNayyan.</p>
            </footer>
        </div>
    );
}

export default AddCandi;