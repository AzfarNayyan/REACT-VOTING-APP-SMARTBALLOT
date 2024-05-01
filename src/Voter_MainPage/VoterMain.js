import React from "react";
import './VoterMain.css';

const VoterMain = () => {
    return (
        <div className="voter-main-container">
            <nav className="top-nav">
                <ul>
                    <li><button>Home</button></li>
                    <li><button>Voting Constituencies</button></li>
                    <li><button>Track Your Votes</button></li>
                    <li><button>Profile Update</button></li>
                    <li><button>FAQ</button></li>
                </ul>
            </nav>
            <div className="blur-background"></div>
            <h1 className="title">Welcome to SmartBallot</h1>
        </div>
    );
}

export default VoterMain;