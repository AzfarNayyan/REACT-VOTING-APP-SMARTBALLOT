import React, { useState } from 'react';
import './FAQPage.css'; 
import { Link } from "react-router-dom";

const FAQPage = () => {

  const [expandedItems, setExpandedItems] = useState({});


  const toggleExpansion = (index) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [index]: !prevExpandedItems[index],
    }));
  };

  return (
    <div className="faq-page-container">
      <nav className="top-nav">
                <ul>
                    <li><Link to="/votermainpage"><button>Home</button></Link></li>
                    <li><Link to="/votingCons"><button>Voting Constituencies</button></Link></li>
                    <li><Link to="/trackvotes"><button>Track Your Votes</button></Link></li>
                    <li><Link to="/profileeditvoter"><button>Profile Update</button></Link></li>
                    <li><button>FAQ</button></li>
                </ul>
      </nav>
      <h1 className='faqhead'>Frequently Asked Questions</h1>
      <div className="faq-list">
        {FAQData.map((item, index) => (
          <div key={index} className="faq-item">
            <div
              className="question"
              onClick={() => toggleExpansion(index)}
            >
              <h3>{item.question}</h3>

              {expandedItems[index] ? (
                <span>-</span>
              ) : (
                <span>+</span>
              )}
            </div>
 
            {expandedItems[index] && (
              <div className="answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <footer className="bottom-bar1">
                <p>© github.com/AzfarNayyan.</p>
      </footer>
    </div>
  );
};


const FAQData = [
  {
    question: 'What is SmartBallot?',
    answer: 'SmartBallot is an innovative online platform designed to revolutionize the voting process...',
  },
  {
    question: 'How can I register to vote?',
    answer: 'To register to vote, you need to visit your local election office and fill out a registration form...',
  },
  {
    question: 'Can I vote online?',
    answer: 'Currently, online voting is not supported. You need to physically visit a polling station...',
  },
  {
    question: 'Can I vote online?',
    answer: 'Currently, online voting is not supported. You need to physically visit a polling station...',
  },

];

export default FAQPage;