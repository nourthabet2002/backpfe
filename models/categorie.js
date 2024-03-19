const mongoose = require('mongoose');

// Define the schema for the Reservation model
const categorieSchema = new mongoose.Schema({
  name: {
    type: String,
    
  }
  
 
}, { collection: "categorie" });
// Create and export the Reservation model based on the schema
const categorie = mongoose.model('categorie', categorieSchema);

module.exports = categorie;