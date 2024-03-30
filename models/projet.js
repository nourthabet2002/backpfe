const mongoose = require('mongoose');

const projetSchema = new mongoose.Schema({
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
    },
    prix:{
        type: String
    },
    etat:{
      type: String
  },
  chefchantier:{
    type: String
},
employe:{
  type: String
}
    

});
{collection :"projet"}

const projet = mongoose.model('projet', projetSchema);

module.exports = projet;