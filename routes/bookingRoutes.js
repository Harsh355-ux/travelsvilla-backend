const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const protect = require('../middleware/authMiddleware');

// CREATE A BOOKING
router.post('/', protect, async (req, res) => {
    try {
        const { destinationId, travelDate } = req.body;
        
        const newBooking = new Booking({
            user: req.user.id,
            destination: destinationId,
            travelDate
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
});

// GET USER'S BOOKINGS FOR DASHBOARD
router.get('/my-bookings', protect, async (req, res) => {
    try {
        // .populate() pulls the actual destination data instead of just the ID
        const bookings = await Booking.find({ user: req.user.id }).populate('destination');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
});

module.exports = router;