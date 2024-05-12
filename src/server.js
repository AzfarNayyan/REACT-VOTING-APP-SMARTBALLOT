const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql/msnodesqlv8');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const config = {
  server: 'AZFAR\\SQLEXPRESS',
  database: 'DBProjectVOTE',
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
};

async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server database');
  } catch (err) {
    console.error('Error connecting to SQL Server:', err);
  }
}


app.post('/checkAdminExistence', async (req, res) => {
  const { cnic, email } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('cnic', sql.VarChar(20), cnic)
      .input('email', sql.VarChar(255), email)
      .query('SELECT * FROM Admin WHERE CNIC = @cnic OR Email = @email');
    
    if (result.recordset.length > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error('Error checking admin existence:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/adminSignUp', async (req, res) => {
  const { cnic, name, email, password } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('cnic', sql.VarChar(20), cnic)
      .input('name', sql.VarChar(255), name)
      .input('email', sql.VarChar(255), email)
      .input('password', sql.VarChar(255), password)
      .query('INSERT INTO Admin (CNIC, Name, Email, [Password]) VALUES (@cnic, @name, @email, @password)');
    
    res.status(200).send('Admin signed up successfully!');
  } catch (err) {
    console.error('Error signing up admin:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/checkVoterExistence', async (req, res) => {
  const { cnic, email } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('cnic', sql.VarChar(20), cnic)
      .input('email', sql.VarChar(255), email)
      .query('SELECT * FROM Voters WHERE CNIC = @cnic OR Email = @email');
    
    if (result.recordset.length > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error('Error checking voter existence:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/voterSignUp', async (req, res) => {
  const { cnic, name, email, password, address } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('cnic', sql.VarChar(20), cnic)
      .input('name', sql.VarChar(255), name)
      .input('email', sql.VarChar(255), email)
      .input('password', sql.VarChar(255), password)
      .input('address', sql.VarChar(sql.MAX), address)
      .query('INSERT INTO Voters (CNIC, Username, Email, [Password], Address) VALUES (@cnic, @name, @email, @password, @address)');
    
    res.status(200).send('Voter signed up successfully!');
  } catch (err) {
    console.error('Error signing up voter:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/adminLogin', async (req, res) => {
  const { cnic, password } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('cnic', sql.VarChar(20), cnic)
      .input('password', sql.VarChar(255), password)
      .query('SELECT * FROM Admin WHERE CNIC = @cnic AND Password = @password');
    
    if (result.recordset.length > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (err) {
    console.error('Error logging in admin:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/voterLogin', async (req, res) => {
  const { cnic, password } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('cnic', sql.VarChar(20), cnic)
      .input('password', sql.VarChar(255), password)
      .query('SELECT * FROM Voters WHERE CNIC = @cnic AND Password = @password');
    
    if (result.recordset.length > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (err) {
    console.error('Error logging in voter:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/checkConstituencyExistence', async (req, res) => {
  const { constituencyName } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('constituencyName', sql.VarChar(255), constituencyName)
      .query('SELECT * FROM Constituencies WHERE ConstituencyName = @constituencyName');

    if (result.recordset.length > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error('Error checking constituency existence:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/addConstituency', async (req, res) => {
  const { constituencyName, constituencyID } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('constituencyName', sql.VarChar(255), constituencyName)
      .input('constituencyID', sql.Int, constituencyID)
      .query('INSERT INTO Constituencies (ConstituencyName, ConstituencyID) VALUES (@constituencyName, @constituencyID)');

    res.status(200).json({ message: 'Constituency added successfully!' });
  } catch (err) {
    console.error('Error adding constituency:', err);
    res.status(500).send('Internal Server Error');
  }
});



app.post('/checkCandidateExistenceByID', async (req, res) => {
  const { candidateID } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('candidateID', sql.Int, candidateID)
      .query('SELECT * FROM Candidates WHERE CandidateID = @candidateID');

    if (result.recordset.length > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error('Error checking candidate existence by ID:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/addCandidate', async (req, res) => {
  const { candidateName, partyAffiliation, bio, constituencyName, candidateID } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('candidateName', sql.VarChar(255), candidateName)
      .input('partyAffiliation', sql.VarChar(255), partyAffiliation)
      .input('bio', sql.VarChar(sql.MAX), bio)
      .input('constituencyName', sql.VarChar(255), constituencyName)
      .input('candidateID', sql.Int, candidateID)
      .query(`
        DECLARE @ConstituencyID INT;

        SELECT @ConstituencyID = ConstituencyID 
        FROM Constituencies 
        WHERE ConstituencyName = @constituencyName;

        INSERT INTO Candidates (Name, PartyAffiliation, Bio, ConstituencyID, CandidateID) 
        VALUES (@candidateName, @partyAffiliation, @bio, @ConstituencyID, @candidateID);
      `);

    res.status(200).json({ message: 'Candidate added successfully!' });
  } catch (err) {
    console.error('Error adding candidate:', err);
    res.status(500).send('Internal Server Error');
  }
});




app.post('/updateVoterDetailsByCNIC', async (req, res) => {
  const { originalCNIC, name, email, password, address } = req.body;
  try {
    
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('originalCNIC', sql.VarChar(20), originalCNIC)
      .query('SELECT * FROM Voters WHERE CNIC = @originalCNIC');

    if (result.recordset.length > 0) {
      
      await pool.request()
        .input('name', sql.VarChar(255), name)
        .input('email', sql.VarChar(255), email)
        .input('password', sql.VarChar(255), password)
        .input('address', sql.VarChar(sql.MAX), address)
        .input('originalCNIC', sql.VarChar(20), originalCNIC)
        .query(`
          UPDATE Voters 
          SET Username = @name, Email = @email, [Password] = @password, Address = @address 
          WHERE CNIC = @originalCNIC
        `);

      res.status(200).json({ success: true });
    } else {
    
      res.status(404).json({ success: false, error: 'Voter with provided CNIC does not exist' });
    }
  } catch (err) {
    console.error('Error updating voter details by CNIC:', err);
    res.status(500).send('Internal Server Error');
  }
});



app.post('/getCandidatesByConstituencyID', async (req, res) => {
  const { constituencyID } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('constituencyID', sql.Int, constituencyID)
      .query('SELECT * FROM Candidates WHERE ConstituencyID = @constituencyID');

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching candidates by constituency ID:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/checkVoterExistence', async (req, res) => {
  const { cnic, email } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('cnic', sql.VarChar(20), cnic)
      .input('email', sql.VarChar(255), email)
      .query('SELECT * FROM Voters WHERE CNIC = @cnic AND Email = @email');
    
    if (result.recordset.length > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error('Error checking voter existence:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/conductBallot', async (req, res) => {
  const { voterCNIC, candidateID } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('voterCNIC', sql.VarChar(20), voterCNIC)
      .input('candidateID', sql.Int, candidateID)
      .query('INSERT INTO Votes (VoterID, CandidateID) VALUES ((SELECT VoterID FROM Voters WHERE CNIC = @voterCNIC), @candidateID)');
    
    res.status(200).send('Vote recorded successfully!');
  } catch (err) {
    console.error('Error recording vote:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/validateVoter', async (req, res) => {
  const { voterCNIC, voterPassword } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('cnic', sql.VarChar(20), voterCNIC)
      .input('password', sql.VarChar(255), voterPassword)
      .query('SELECT * FROM Voters WHERE CNIC = @cnic AND [Password] = @password');

    if (result.recordset.length > 0) {
      res.status(200).json({ valid: true });
    } else {
      res.status(200).json({ valid: false });
    }
  } catch (err) {
    console.error('Error validating voter:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/recordVote', async (req, res) => {
  const { voterCNIC, candidateID } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('voterCNIC', sql.VarChar(20), voterCNIC)
      .input('candidateID', sql.Int, candidateID)
      .query('INSERT INTO Votes (VoterID, CandidateID) VALUES ((SELECT VoterID FROM Voters WHERE CNIC = @voterCNIC), @candidateID)');
    
    res.status(200).send('Vote recorded successfully!');
  } catch (err) {
    console.error('Error recording vote:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/getConstituencyDetailsByID', async (req, res) => {
  const { constituencyID } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('constituencyID', sql.Int, constituencyID)
      .query('SELECT * FROM Constituencies WHERE ConstituencyID = @constituencyID');
    
    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching constituency details by ID:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/getCandidatesByConstituencyID', async (req, res) => {
  const { constituencyID } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('constituencyID', sql.Int, constituencyID)
      .query('SELECT * FROM Candidates WHERE ConstituencyID = @constituencyID');
    
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching candidates by constituency ID:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/getVoteCountByCandidateID', async (req, res) => {
  const { candidateID } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('candidateID', sql.Int, candidateID)
      .query('SELECT COUNT(*) AS count FROM Votes WHERE CandidateID = @candidateID');
    
    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching vote count by candidate ID:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/trackVotesByCNIC', async (req, res) => {
  const { voterCNIC } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('voterCNIC', sql.VarChar(20), voterCNIC)
      .query(`
        SELECT Candidates.*, Constituencies.ConstituencyName
        FROM Votes
        INNER JOIN Candidates ON Votes.CandidateID = Candidates.CandidateID
        INNER JOIN Constituencies ON Candidates.ConstituencyID = Constituencies.ConstituencyID
        INNER JOIN Voters ON Votes.VoterID = Voters.VoterID
        WHERE Voters.CNIC = @voterCNIC
      `);
    
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error tracking votes by CNIC:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/constituencies', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Constituencies');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching constituencies:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/checkVoteExistence', async (req, res) => {
  const { voterCNIC } = req.body;
  try {
      const pool = await sql.connect(config);
      const result = await pool.request()
          .input('voterCNIC', sql.VarChar(20), voterCNIC)
          .query('SELECT * FROM Votes WHERE VoterID = (SELECT VoterID FROM Voters WHERE CNIC = @voterCNIC)');
      
      if (result.recordset.length > 0) {
          res.status(200).json({ exists: true });
      } else {
          res.status(200).json({ exists: false });
      }
  } catch (err) {
      console.error('Error checking vote existence:', err);
      res.status(500).send('Internal Server Error');
  }
});


connectToDatabase();

app.listen(5501, () => console.log('Server listening on port 5501'));