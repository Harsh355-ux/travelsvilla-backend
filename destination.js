const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true }, // e.g., 'Beach', 'Mountain'
    isPopular: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);