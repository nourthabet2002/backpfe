const mongoose = require('mongoose');

const resclientSchema = new mongoose.Schema({
  
  date: {
    type: String,
    required: true
    
  },
 
    lieu:{
        type: String
    },
    categorieId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'categorie'
    
    }
    ,
    clientId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'client'
    
    }
    
});
{collection :"resclient"}

const resclient = mongoose.model('resclient', resclientSchema);

module.exports = resclient;