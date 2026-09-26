const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const destinationRoutes = require('./routes/destinationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows the server to accept JSON data

// Use Routes
app.use('/api/destinations', destinationRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Travelsvilla API is running...');
});

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully!');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
    });