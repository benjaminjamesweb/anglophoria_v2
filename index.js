const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

// Middleware to parse JSON
app.use(express.json());

app.use(express.static(path.join(__dirname, 'frontend')));

// Serve static files from the 'frontend/HomePageBeforeLogIn' folder
app.use(express.static(path.join(__dirname, 'frontend', 'HomePageBeforeLogIn')));

// User routes for API
const UserRoutes = require('./routes/user');
app.use('/users', UserRoutes);  // Mount user routes at /users

// Catch-all route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'HomePageBeforeLogIn', 'index.html'));
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to the database');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Error connecting to the database: ${error}`);
    });
