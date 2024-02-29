const mongoose = require('mongoose');

// Define the schema for the Reservation model
const reservationSchema = new mongoose.Schema({
  etatres: {
    type: String,
    required: true
  },
  dateres: {
    type: Date,
    required: true
  },
  service: {
    type: String,
    required: true
  }
}, { collection: "Reservation" });
// Create and export the Reservation model based on the schema
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;

    
    
    
        
    
