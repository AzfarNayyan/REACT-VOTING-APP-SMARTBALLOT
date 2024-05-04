

import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import './ProfileEditVoter.css';

const ProfileEditVoter = () => {
    const [originalCNIC, setOriginalCNIC] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [updated, setUpdated] = useState(false);
    const [error, setError] = useState("");

    const handleEdit = async () => {
        try {
            const response = await fetch('/updateVoterDetailsByCNIC', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ originalCNIC, name, email, password, address })
            });
            const data = await response.json();
            if (data.success) {
                setUpdated(true);
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error('Error updating voter details:', err);
            setError('Server Error');
        }
    };

    return (
        <div className="voter-main-container1">
            <nav className="top-nav">
                <ul>
                    <li><Link to="/votermainpage"><button>Home</button></Link></li>
                    <li><Link to="/votingCons"><button>Voting Constituencies</button></Link></li>
                    <li><Link to="/trackvotes"><button>Track Your Votes</button></Link></li>
                    <li><button>Profile Update</button></li>
                    <li><Link to="/faq"><button>FAQ</button></Link></li> 
                </ul>
            </nav>
            <div className="edit-form-container">
                <h2>Edit Voter Details</h2>
                <input type="text" placeholder="Original CNIC" value={originalCNIC} onChange={(e) => setOriginalCNIC(e.target.value)} />
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <button onClick={handleEdit}>Update Details</button>
                {updated && <p>Voter details updated successfully!</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
            <footer className="bottom-bar8">
                <p>© github.com/AzfarNayyan.</p>
            </footer>
        </div>
    );
}

export default ProfileEditVoter;