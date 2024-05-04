import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Voting.css';

const Voting = () => {
  
    const [constituencyID, setConstituencyID] = useState("");
    const [time, setTime] = useState("");


    const handleConstituencyChange = (e) => {
        setConstituencyID(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    return (
        <div className="voter-main-container">
            <nav className="top-nav">
                <ul>
                    <li><Link to="/adminmainpage"><button>Home</button></Link></li>
                    <li><Link to="/elecconsi"><button>Add Election Constituency</button></Link></li>
                    <li><Link to="/addcandi"><button>Add Candidate</button></Link></li>
                    <li><Link to="/voting"><button>Conduct Voting</button></Link></li>
                    <li><Link to="/faq2"><button>FAQ</button></Link></li>
                </ul>
            </nav>
            <form className="form-container10" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group10">
                    <label htmlFor="constituencyID">Enter Constituency ID:</label>
                    <input 
                        type="text" 
                        id="constituencyID" 
                        name="constituencyID" 
                        value={constituencyID} 
                        onChange={handleConstituencyChange} 
                        required 
                    />
                </div>
                <div className="form-group10">
                    <label htmlFor="time">Enter Time for Ballot (in minutes):</label>
                    <input 
                        type="number" 
                        id="time" 
                        name="time" 
                        value={time} 
                        onChange={handleTimeChange} 
                        required 
                    />
                </div>
                <Link to={`/conduct-ballot?constituencyID=${constituencyID}&time=${time}`}>
                    <button className="submit-button1">Conduct Ballot</button>
                </Link>
            </form>
            <footer className="bottom-bar2">
                <p>© github.com/AzfarNayyan.</p>
            </footer>
        </div>
    );
}

export default Voting;