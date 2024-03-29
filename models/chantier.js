const mongoose = require('mongoose');

// Define the schema for the Chantier model
const chantierSchema = new mongoose.Schema({
  datedebut: {
    type: String,
    required: true
  },
  duree: {
    type: Number,
    required: true
  },
  datefin: {
    type: String,
    required: true
  }
});
{collection :"Chantier"}

// Create and export the Chantier model based on the schema
const Chantier = mongoose.model('Chantier', chantierSchema);

module.exports = Chantier;
