
const mongoose = require('mongoose');

const resclientSchema = new mongoose.Schema({
  name: {
    type: String
  },
  adresse: {
    type: String
  },
  numtel: {
    type: String
  },
  date: {
    type: String,
    required: true
  },
  lieu: {
    type: String
  },
  categorieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categorie',
    required: true  // if this is a necessary relationship
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
    required: true  // if this is a necessary relationship
  }
}, { collection: "resclient" });

const resclient = mongoose.model('resclient', resclientSchema);
module.exports = resclient;
