const mongoose = require('mongoose');

// Define the schema for the Chantier model
const affemployeSchema = new mongoose.Schema({
  projetId: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'projet'
  },
  EmployeeId: {
    type : mongoose.Schema.Types.ObjectId,
  ref : 'employe'
  },
  date: {
    type: String,
    required: true
  }
});
{collection :"affecteremploye"}

// Create and export the Chantier model based on the schema
const affecteremp = mongoose.model('affecteremp', affemployeSchema);

module.exports = affecteremp;