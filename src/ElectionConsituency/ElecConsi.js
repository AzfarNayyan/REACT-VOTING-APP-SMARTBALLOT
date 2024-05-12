import React, { useState } from "react";
import './ElecConsi.css';
import { Link } from "react-router-dom";

const ElecConsi = () => {
    const [constituencyName, setConstituencyName] = useState("");
    const [constituencyID, setConstituencyID] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleConstituencySubmission = async (e) => {
        e.preventDefault();
        try {

            const checkConstituencyResponse = await fetch('http://localhost:5501/checkConstituencyExistence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ constituencyName, constituencyID }),
            });
            const data = await checkConstituencyResponse.json();
            if (data.exists) {
                setMessage('Constituency already exists.');
                setShowMessage(true);
            } else {

                const addConstituencyResponse = await fetch('http://localhost:5501/addConstituency', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ constituencyName, constituencyID }),
                });
                const result = await addConstituencyResponse.json();
                setMessage(result.message);
                setShowMessage(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
            setShowMessage(true);
        }
    };

    return (
        <div>
            <nav className="top-nav1">
                <ul>
                    <li><Link to="/adminmainpage"><button>Home</button></Link></li>
                    <li><Link to="/elecconsi"><button>Add Election Constituency</button></Link></li>
                    <li><Link to="/addcandi"><button>Add Candidate</button></Link></li>
                    <li><Link to="/voting"><button>Conduct Voting</button></Link></li>
                    <li><Link to="/faq2"><button>FAQ</button></Link></li>
                </ul>
            </nav>
            <div className="main-content">
                <h2>Add Election Constituency</h2>
                <form onSubmit={handleConstituencySubmission}>
                    <div className="form-group">
                        <label htmlFor="constituencyName">Constituency Name:</label>
                        <input
                            type="text"
                            id="constituencyName"
                            value={constituencyName}
                            onChange={(e) => setConstituencyName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="constituencyID">Constituency ID:</label>
                        <input
                            type="text"
                            id="constituencyID"
                            value={constituencyID}
                            onChange={(e) => setConstituencyID(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {showMessage && <div className="message">{message}</div>}
            </div>
            <footer className="bottom-bar2">
                <p>© github.com/AzfarNayyan.</p>
            </footer>
        </div>
    );
}

export default ElecConsi;
