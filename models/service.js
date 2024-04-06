const mongoose = require('mongoose');

// Define the schema for the Service model
const serviceSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        unique: true
        
    },
    description: {
        type: String,
        required: true,
        unique: true
    }

}, { collection: "service" });


const service = mongoose.model('service', serviceSchema);

module.exports = service ;