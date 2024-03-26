const mongoose = require('mongoose');

// Define the schema for the Reservation model
const reservationSchema = new mongoose.Schema({
 
  dateres: {
    type: String,
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

    
    
    
        
    
