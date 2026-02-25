const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));

// Routes
// We'll define the main API prefix here. You can add more routes later when you provide the API details.
app.use('/api/data', dataRoutes);

// Base route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Sample PostgreSQL Node.js API' });
});

module.exports = app;
