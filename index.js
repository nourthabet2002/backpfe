const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Reservationmodel = require("./models/réservation");
const bodyParser = require("body-parser");
const cors = require("cors");
const Chantiermodel = require("./models/chantier");
const Chefmodel = require("./models/chef");
const Employee = require("./models/employe");
const Chantier = require("./models/chantier");
const avis = require("./models/avis");
const resclient = require("./models/resclient");
const PORT = process.env.PORT || 7000;

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
  app.post("/add", async (req, res) => {
    //     try{var response = await personmodel.find({name : "%sa%"})
    //     res.json(response);
    // }catch (error){
    //     console.log()
    // }
    console.log(req.body);
    const { nom, prénom, email, password, numtel } = req.body;
    let newChef = Chefmodel({
      nom: nom,
      prénom: prénom,
      email: email,
      password: password,
      numtel:numtel,
    });
    var response = await newChef.save();
  
    res.json(response);
  });
  app.post("/employe/add", async (req, res) => {
    //     try{var response = await personmodel.find({name : "%sa%"})
    //     res.json(response);
    // }catch (error){
    //     console.log()
    // }
    console.log(req.body);
    const { nom, prénom, email, password, numtel, spécialité } = req.body;
    let newEmployee = Employee({
      nom: nom,
      prénom: prénom,
      email: email,
      password: password,
      numtel:numtel,
      spécialité:spécialité,
    });
    var response = await newEmployee.save();
  
    res.json(response);
  });
  app.post("/chantier/add", async (req, res) => {
    //     try{var response = await personmodel.find({name : "%sa%"})
    //     res.json(response);
    // }catch (error){
    //     console.log()
    // }
    console.log(req.body);
    const { datedebut, duree, datefin } = req.body;
    let newChantier = Chantiermodel({
      datedebut: datedebut,
      duree: duree,
      datefin: datefin,
     
    });
    var response = await newChantier.save();
  
    res.json(response);
  });
  app.post("/reservation/add", async (req, res) => {
    //     try{var response = await personmodel.find({name : "%sa%"})
    //     res.json(response);
    // }catch (error){
    //     console.log()
    // }
    console.log(req.body);
    const { etatres, dateres, service } = req.body;
    let newReservation = Reservationmodel({
      etatres: etatres,
      dateres: dateres,
      service: service,
     
    });
    var response = await newReservation.save();
  
    res.json(response);
  });
  app.delete("/Reservation/:id", async (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    console.log("id to be deleted =", id);
  
    try {
      const deletedReservation = await Reservationmodel.findOneAndDelete({ _id: id });
  
      if (!deletedReservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
  
      res.json({ message: "Reservation deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
app.delete("/chef/:id", async (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  console.log("id to be deleted =", id);

  try {
    const deletedChef = await Chefmodel.findOneAndDelete({ _id: id });

    if (!deletedChef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    res.json({ message: "Chef deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.delete("/employe/:id", async (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  console.log("id to be deleted =", id);

  try {
    const deletedEmployee = await Employee.findOneAndDelete({ _id: id });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.delete("/chantier/:id", async (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  console.log("id to be deleted =", id);

  try {
    const deletedChantier = await Chantiermodel.findOneAndDelete({ _id: id });

    if (!deletedChantier) {
      return res.status(404).json({ message: "Chantier not found" });
    }

    res.json({ message: "Chantier deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put('/employe/:id', async (req, res) => {
  const id = req.params.id;
  const { nom, prénom, email, password, num_tel } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { $set: { nom, prénom, email, password, num_tel } },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/chantier/:id', async (req, res) => {
  const id = req.params.id;
  const { datedebut, duree, datefin } = req.body;

  try {
    const updatedChantier = await Chantier.findByIdAndUpdate(
      id,
      { $set: { datedebut, duree, datefin } },
      { new: true }
    );

    if (!updatedChantier) {
      return res.status(404).json({ message: 'Chantier not found' });
    }

    res.status(200).json(updatedChantier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/chef/:id', async (req, res) => {
  const id = req.params.id;
  const { nom, prénom, email, password, numtel } = req.body;

  try {
    const updatedChefmodel = await Chefmodel.findByIdAndUpdate(
      id,
      { $set: { nom, prénom, email, password, numtel } },
      { new: true }
    );

    if (!updatedChefmodel) {
      return res.status(404).json({ message: 'Chef not found' });
    }

    res.status(200).json(updatedChefmodel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post("/avis/add", async (req, res) => {
  //     try{var response = await personmodel.find({name : "%sa%"})
  //     res.json(response);
  // }catch (error){
  //     console.log()
  // }
  console.log(req.body);
  const { commentaire } = req.body;
  let newavis = avis({
   
    commentaire:commentaire,
  });
  var response = await newavis.save();

  res.json(response);
});
app.post("/resclient/add", async (req, res) => {
  //     try{var response = await personmodel.find({name : "%sa%"})
  //     res.json(response);
  // }catch (error){
  //     console.log()
  // }
  console.log(req.body);
  const { serviceName, subCategory, date, numberOfrooms, place } = req.body;
  let newresclient = resclient({
    serviceName: serviceName,
    subCategory: subCategory,
    date: date,
    numberOfrooms: numberOfrooms,
    place:place,
    
  });
  var response = await newresclient.save();

  res.json(response);
});