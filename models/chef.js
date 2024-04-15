const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
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
    required: true,
    unique: true
  },
  numtel: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{8}$/.test(v);
      },
      message: props => `${props.value} is not a valid telephone number! Must be composed of eight numbers.`
    }
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'service'
  }
}, { collection: "chefs" });

const Chefmodel = mongoose.model('Chef', chefSchema);

module.exports = Chefmodel;

