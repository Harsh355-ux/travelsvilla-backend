const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// GET all destinations (Flutter will call this for the Home Screen)
router.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching destinations", error });
    }
});

// GET popular packages only
router.get('/popular', async (req, res) => {
    try {
        const popularDestinations = await Destination.find({ isPopular: true });
        res.status(200).json(popularDestinations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching popular packages", error });
    }
});

// POST a new destination (You will use this to add packages from Postman)
router.post('/', async (req, res) => {
    try {
        const newDestination = new Destination(req.body);
        const savedDestination = await newDestination.save();
        res.status(201).json(savedDestination);
    } catch (error) {
        res.status(500).json({ message: "Error saving destination", error });
    }
});

module.exports = router;