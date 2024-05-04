create database DBProject
go
use DBProject
go


--DATABASE SCHEMA CONSISTING 7 TABLES.

--VOTERS TABLE
CREATE TABLE Voters (
  VoterID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
  CNIC VARCHAR(20) UNIQUE,
  Username VARCHAR(255),
  Address VARCHAR(MAX),
  Email VARCHAR(255),
  [Password] VARCHAR(255)
);


--CONSTITUENCIES TABLE
CREATE TABLE Constituencies (
  ConstituencyName VARCHAR(255),
  ConstituencyID INT IDENTITY(1,1) PRIMARY KEY,
);



--CANDIDATES TABLE
CREATE TABLE Candidates (
  Name VARCHAR(255),
  PartyAffiliation VARCHAR(255),
  Bio VARCHAR(1000),
  CandidateID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
  ConstituencyID INT,
  FOREIGN KEY (ConstituencyID) REFERENCES Constituencies(ConstituencyID) ON DELETE CASCADE ON UPDATE CASCADE, 
);

SET IDENTITY_INSERT Candidates ON;


--VOTES TABLE
CREATE TABLE Votes (
  VoteID INT IDENTITY(1,1) PRIMARY KEY,  
  VoterID INT NOT NULL,
  FOREIGN KEY (VoterID) REFERENCES Voters(VoterID) ON DELETE CASCADE ON UPDATE CASCADE, 
  CandidateID INT NOT NULL,
  FOREIGN KEY (CandidateID) REFERENCES Candidates(CandidateID) ON DELETE CASCADE ON UPDATE CASCADE, 
);

--ADMIN TABLE
CREATE TABLE Admin (
  CNIC VARCHAR(20) unique not null,
  Name VARCHAR(255) NOT NULL,
  Email VARCHAR(255) unique not null,
  [Password] VARCHAR(255) NOT NULL,
  AdminID INT IDENTITY(1,1) PRIMARY KEY 
);




--FORM 47 TABLE
CREATE TABLE Form47 (
  Form47ID INT IDENTITY(1,1) PRIMARY KEY,
  ConstituencyID INT NOT NULL,
  FOREIGN KEY (ConstituencyID) REFERENCES Constituencies(ConstituencyID) ON DELETE CASCADE ON UPDATE CASCADE, 
  ReturningOfficer VARCHAR(255),
  TotalVotes INT,
  ValidVotes INT,
  InvalidVotes INT
);

--RESULT TABLE
CREATE TABLE Result (
  VotePercentages DECIMAL(10,2),  
  CandidateID INT NOT NULL,
  FOREIGN KEY (CandidateID) REFERENCES Candidates(CandidateID), 
  ConstituencyID INT NOT NULL,
  FOREIGN KEY (ConstituencyID) REFERENCES Constituencies(ConstituencyID), 
);


select * from Admin
