import React from "react";
import { Link } from "react-router-dom"; 
import './VoterMain.css';

const VoterMain = () => {
    return (
        <div className="voter-main-container1">
            <nav className="top-nav">
                <ul>
                    <li><button>Home</button></li>
                    <li><Link to="/votingCons"><button>Voting Constituencies</button></Link></li>
                    <li><Link to="/trackvotes"><button>Track Your Votes</button></Link></li>
                    <li><Link to="/profileeditvoter"><button>Profile Update</button></Link></li>
                    <li><Link to="/faq"><button>FAQ</button></Link></li> 
                </ul>
            </nav>
            <div className="blur-background"></div>
            <h1 className="title">Welcome to SmartBallot</h1>
            <div className="paragraph-container">
                <p className="paragraph">
                    In recent years, Pakistan has been grappling with a series of challenges surrounding its electoral process, leading to what can be termed an "election crisis." One of the primary issues contributing to this crisis is the prevalence of electoral fraud and irregularities. Reports of ballot stuffing, voter intimidation, and tampering with election results have raised significant concerns about the fairness and transparency of the electoral process. Furthermore, allegations of electoral misconduct and malpractice have undermined public trust in the democratic institutions responsible for overseeing elections. This erosion of trust has led to widespread skepticism among the electorate regarding the legitimacy of election outcomes, creating a sense of disillusionment and frustration among voters.
                    Another key factor exacerbating the election crisis in Pakistan is the lack of accountability and transparency within the electoral system. Weak enforcement of electoral laws and regulations, coupled with the influence of powerful political actors, has created an environment conducive to electoral manipulation and abuse of power. 
                    Additional, issues such as voter disenfranchisement, inadequate voter education, and limited access to polling stations in certain areas have further complicated the electoral landscape, hindering the participation of marginalized communities and undermining the inclusivity of the electoral process. 
                    Addressing the election crisis in Pakistan requires comprehensive reforms aimed at strengthening electoral integrity, enhancing transparency, and promoting accountability. This includes measures to combat electoral fraud, ensure the independence of electoral institutions, and promote civic engagement and voter education. Only through concerted efforts to address these challenges can Pakistan achieve a more credible, inclusive, and democratic electoral system that reflects the will of the people.
                </p>
            </div>
            <footer className="bottom-bar7">
                <p>© github.com/AzfarNayyan.</p>
            </footer>
        </div>
    );
}

export default VoterMain; 



//886302518859-fkvi895pf6t8i8svsd8hi46fbfp89n53.apps.googleusercontent.com