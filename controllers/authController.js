const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Register patient
const registerPatient = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if patient already exists
    const [rows] = await db.execute('SELECT * FROM patients WHERE email = ?', [email]);
    if (rows.length > 0) return res.status(400).json({ message: 'Patient already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save patient to the database
    const [result] = await db.execute('INSERT INTO patients (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    // Create JWT token
    const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Patient registered', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login patient
const loginPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM patients WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(400).json({ message: 'Patient not found' });

    // Check password
    const validPassword = await bcrypt.compare(password, rows[0].password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    // Create JWT token
    const token = jwt.sign({ id: rows[0].id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerPatient, loginPatient };
