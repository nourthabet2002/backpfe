const mongoose = require('mongoose');

const projetSchema = new mongoose.Schema({
 
 
  date: {
    type: String,
    required: true
    
  },
 

    adresse:{
        type: String
    },
    datedebut:{
        type: String
    },
    duree:{
      type: String
  },
    etat:{
      type: String
  },
  chefchantier:{
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
resclientId : {
  type : mongoose.Schema.Types.ObjectId,
  ref : 'resclient'

}

    

});
{collection :"projets"}

const projet = mongoose.model('projets', projetSchema);

module.exports = projet;