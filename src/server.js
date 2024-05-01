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
  database: 'DBProject',
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

// Check if admin account already exists
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

// Insert admin data
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

// Check if voter account already exists
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

// Insert voter data
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

// Admin Login
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

// Voter Login
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


connectToDatabase();

app.listen(5501, () => console.log('Server listening on port 5501'));