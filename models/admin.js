const mongoose = require('mongoose');

// Define the schema for the Service model
const adminSchema = new mongoose.Schema({
    username: {
        type: String, // Change the type to String
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: "admin" });


const admin = mongoose.model('admin', adminSchema);

module.exports = admin ;