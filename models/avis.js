const mongoose = require('mongoose');

// Define the schema for the Chantier model
const avisSchema = new mongoose.Schema({
  commentaire: {
    type: String,
    
  },
  clientId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'client'
  
  },
  date: {
    type: String,
    required: true,
    default: Date.now
  }

});
{collection :"avis"}

// Create and export the Chantier model based on the schema
const avis = mongoose.model('avis', avisSchema);

module.exports = avis;