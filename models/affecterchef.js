const mongoose = require('mongoose');

// Define the schema for the Service model
const affecterchefSchema = new mongoose.Schema({
    nom: {
        type: String, // Change the type to String
        required: true
    },
    service: {
        type: String,
        required: true
    }
}, { collection: "affectchef" });


const affectchef = mongoose.model('affectchef', affecterchefSchema);

module.exports = affectchef ;