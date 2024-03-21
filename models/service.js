const mongoose = require('mongoose');

// Define the schema for the Service model
const serviceSchema = new mongoose.Schema({
    category: {
        type: String, // Change the type to String
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { collection: "service" });


const service = mongoose.model('service', serviceSchema);

module.exports = service ;