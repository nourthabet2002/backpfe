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
const Reservation = require("./models/réservation");
const service = require("./models/service");
const categorie = require("./models/categorie");

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
app.delete("/chef/:nom", async (req, res) => {
  const nom = req.params.nom;

  try {
    const deletedChef = await Chefmodel.findOneAndDelete({ nom });

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
app.put("/chef/:nom", async (req, res) => {
  const nom = req.params.nom;
  const updatedName = req.body.name; // Assuming you're sending the updated name in the request body

  try {
    const updatedChef = await Chefmodel.findOneAndUpdate(
      { nom }, // Filter to find the chef by name
      { $set: { nom: updatedName } }, // Update the name field
      { new: true } // Return the updated document
    );

    if (!updatedChef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    res.json({ message: "Chef updated", updatedChef });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
app.get("/Reservation", async (req, res) => {
  try {
    const Reservation = await Reservationmodel.find();
    res.json(Reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/service/add", async (req, res) => {
  try {
    const { name, category } = req.body; // Extract name and category from the request body

    // Check if both name and category are provided
    if (!name || !category) {
      return res.status(400).json({ error: "Both name and category are required" });
    }

    // Create a new service instance
    let newService = new service({
      name: name,
      category: category
    });

    // Save the new service to the database
    const response = await newService.save();

    // Send the saved service document as response
    res.json(response);
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ error: "Failed to add service" });
  }
});

app.get("/chef", async (req, res) => {
  try {
    const chefs = await Chefmodel.find();
    res.json(chefs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/service", async (req, res) => {
  try {
    const services = await service.find(); // Assuming your model name is Service
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/categorie/add", async (req, res) => {
  //     try{var response = await personmodel.find({name : "%sa%"})
  //     res.json(response);
  // }catch (error){
  //     console.log()
  // }
  console.log(req.body);
  const { name } = req.body;
  let newcategorie = categorie({
    
    name:name,
    
  });
  var response = await newcategorie.save();
  res.json(response);
});
