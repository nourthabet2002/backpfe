const mongoose = require('mongoose');

const resclientSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
    
  },
 
  descripition: {
    type: String,
    
  },
    lieu:{
        type: String
    }
});
{collection :"resclient"}

const resclient = mongoose.model('resclient', resclientSchema);

module.exports = resclient;