const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
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
    required: true
  },
  
  serviceId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'service'

}
,

});
{collection :"Employee"}

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
