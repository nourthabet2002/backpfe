const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prénom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  numtel: {
    type: String,
    validate: {
      validator: function(v) {
        // Regular expression to match exactly 8 digits
        return /^\d{8}$/.test(v);
      },
      message: props => `${props.value} is not a valid numtel number!`
    },
    required: true
  },
  adresse: {
    type: String,
    required: true
  }
});
{collection :"clients"}

const client = mongoose.model('client', clientSchema);

module.exports = client;