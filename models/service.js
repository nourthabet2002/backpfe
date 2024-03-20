const mongoose = require('mongoose');

// Define the schema for the Reservation model
const serviceSchema = new mongoose.Schema({
  
  categorie : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'categorie',
    required: true

}
,
  
  
  name: {
    type: String,
    
  }
  
 
}, { collection: "service" });
// Create and export the Reservation model based on the schema

const service = mongoose.model('service', serviceSchema);

module.exports = service ;
