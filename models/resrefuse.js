const mongoose = require('mongoose');

const resrefuseSchema = new mongoose.Schema({
  
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
    
    },
    etat:{
        type:String
    }
    
});
{collection :"resrefuse"}

const resrefuse = mongoose.model('resrefuse', resrefuseSchema);

module.exports = resrefuse;