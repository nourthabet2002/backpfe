const mongoose = require('mongoose');

// Define the schema for the Reservation model
const categorieSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  serviceId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'service'

}
,

  
 
}, { collection: "categorie" });
// Create and export the Reservation model based on the schema
const categorie = mongoose.model('categorie', categorieSchema);

module.exports = categorie;