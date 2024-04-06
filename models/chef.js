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
    required: true
  },
  serviceId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'service'

}
,
});
{collection :"Chef"}

const Chefmodel = mongoose.model('Chef', chefSchema);
module.exports = Chefmodel;
