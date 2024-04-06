const mongoose = require('mongoose');

const projetSchema = new mongoose.Schema({
 
 
  date: {
    type: String,
    required: true
    
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
{collection :"projet"}

const projet = mongoose.model('projet', projetSchema);

module.exports = projet;