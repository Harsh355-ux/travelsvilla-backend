const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const destinationRoutes = require('./routes/destinationRoutes');
const authRoutes = require('./routes/authRoutes');         // NEW
const bookingRoutes = require('./routes/bookingRoutes');   // NEW

const app = express();

app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/destinations', destinationRoutes);
app.use('/api/auth', authRoutes);                          // NEW
app.use('/api/bookings', bookingRoutes);                   // NEW

app.get('/', (req, res) => {
    res.send('Travelsvilla API is running...');
});

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully!');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
    });