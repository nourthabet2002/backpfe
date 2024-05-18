const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Reservationmodel = require("./models/réservation");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Chantiermodel = require("./models/chantier");
const Chefmodel = require("./models/chef");
const Employee = require("./models/employe");
const Chantier = require("./models/chantier");
const avis = require("./models/avis");
const resclient = require("./models/resclient");
const Reservation = require("./models/réservation");
const service = require("./models/service");
const categorie = require("./models/categorie");
const admin = require("./models/admin");
const User = require("./models/userDetails");
const affectchef = require("./models/affecterchef");
const client = require("./models/client");
const projet = require("./models/projet");
const resrefuse = require("./models/resrefuse");
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
    console.log(req.body);
    const { nom, prénom, email, password, numtel, categorieId } = req.body;

    // Check if a chef with the same email already exists
    const existingChef = await Chefmodel.findOne({ email: email });

    if (existingChef) {
        return res.status(400).json({ error: "Chef with this email already exists." });
    }

    // If the chef doesn't exist, create a new one and save it
    let newChef = Chefmodel({
      nom: nom,
      prénom: prénom,
      email: email,
      password: password,
      numtel: numtel,
      categorieId: categorieId,
    });

    try {
        var response = await newChef.save();
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while adding the chef." });
    }
});

app.post("/employe/add", async (req, res) => {
  const { nom, prénom, email, password, numtel, categorieId } = req.body;

  try {
    // Check if an employee with the same email already exists
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      // If an employee with the same email exists, return an error response
      return res.status(400).json({ error: "Employee with this email already exists" });
    }

    // Validate telephone number: must be composed of eight digits
    if (!/^[0-9]{8}$/.test(numtel)) {
      return res.status(400).json({ error: "Invalid telephone number. Must be composed of eight digits." });
    }

    // If no employee with the same email exists and telephone number is valid, create a new employee
    const newEmployee = new Employee({
      nom,
      prénom,
      email,
      password,
      numtel,
      categorieId,
    });

    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    // Return the saved employee as the response
    res.json(savedEmployee);
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "An error occurred while adding the employee" });
  }
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
    const {  dateres, service } = req.body;
    let newReservation = Reservationmodel({
      
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
  const updatedFields = req.body; // Assuming you're sending all updated fields in the request body

  try {
    const updatedChef = await Chefmodel.findOneAndUpdate(
      { nom }, // Filter to find the chef by name
      { $set: updatedFields }, // Update all fields based on the provided data
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
  const { commentaire, clientId } = req.body;
  let newavis = avis({
   
    commentaire:commentaire,
    clientId:clientId,
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
  const { date,  lieu, categorieId, clientId } = req.body;
  let newresclient = resclient({
    
    date: date,
    lieu:lieu,
    categorieId:categorieId,
    clientId:clientId
    
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
    const { name, description } = req.body;

    // Check if a service with the same name already exists
    const existingService = await service.findOne({ name: name });
    if (existingService) {
      return res.status(400).json({ error: "Service with the same name already exists" });
    }

    // Create a new service instance
    let newService = new service({
      name: name,
      description: description
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
  try {
    console.log(req.body);
    const { name, serviceId } = req.body; // Extracting name and serviceId from request body

    // Creating a new categorie document with both name and serviceId
    let newcategorie = new categorie({
      name: name,
      serviceId: serviceId
    });

    // Saving the new categorie document to the database
    var response = await newcategorie.save();
    
    res.json(response); // Sending back the response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" }); // Sending an error response in case of any errors
  }
});
app.get("/avis", async (req, res) => {
  try {
    const aviss = await avis.find().populate('clientId'); // Assuming your model name is Service
    res.json(aviss);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/admin/add", async (req, res) => {
  //     try{var response = await personmodel.find({name : "%sa%"})
  //     res.json(response);
  // }catch (error){
  //     console.log()
  // }
  console.log(req.body);
  const { username, password} = req.body;
  let newadmin = admin({
    username: username,
    password: password,
   
  });
  var response = await newadmin.save();

  res.json(response);
});
// Example backend route in Express.js
app.get('/chef/:nom', async (req, res) => {
  const chefNom = req.params.nom;
  // Use the chefNom to query your database or some other data source
  // Return the data of the chef with the given nom
  try {
    const chef = await Chefmodel.findOne({ nom: chefNom }); // Example assuming you're using MongoDB with Mongoose
    res.json(chef); // Send the chef data as JSON response
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});
app.post("/login-user", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user does not exist, return error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid, return error
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // If authentication is successful, generate JWT token
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "15m" });

    // Return the token in the response
    return res.status(200).json({ status: "ok", data: token });
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(5000, () => {
  console.log("Server Started");
});
app.post("/affecter/chef", async (req, res) => {
  //     try{var response = await personmodel.find({name : "%sa%"})
  //     res.json(response);
  // }catch (error){
  //     console.log()
  // }
  console.log(req.body);
  const { nom, service} = req.body;
  let newaffectchef = affectchef({
    nom: nom,
    service: service,
   
  });
  var response = await newaffectchef.save();

  res.json(response);
});
app.get("/chef", async (req, res) => {
  try {
    const chefss = await Chefmodel.find(); // Assuming your model name is Service
    res.json(chefss);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/user", async (req, res) => {
  //     try{var response = await personmodel.find({name : "%sa%"})
  //     res.json(response);
  // }catch (error){
  //     console.log()
  // }
  console.log(req.body);
  const { fname, lname, email, password, userType } = req.body;
  let newUser = User({
    fname: fname,
    lname: lname,
    email: email,
    password: password,
    userType: userType,

   
  });
  var response = await newUser.save();

  res.json(response);
});
app.get("/resclient", async (req, res) => {
  try {
    const resclients = await resclient.find();
    res.json(resclients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/projet/add", async (req, res) => {
  //     try{var response = await personmodel.find({name : "%sa%"})
  //     res.json(response);
  // }catch (error){
  //     console.log()
  // }
  console.log(req.body);
  const {  date,  lieu, datedebut, duree, etat, chefchantier, employe, categorieId, clientId } = req.body;
  let newprojet = projet({
   
    date: date,
  
    lieu:lieu,
    datedebut:datedebut,
    duree:duree,
    etat:etat,
    chefchantier:chefchantier,
    employe:employe,
    categorieId:categorieId,
    clientId:clientId,

  });
  var response = await newprojet.save();

  res.json(response);
});
app.get("/employes", async (req, res) => {
  try {
    const Employees = await Employee.find(); // Assuming your model name is Service
    res.json(Employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.delete("/employee/:nom", async (req, res) => {
  const nom = req.params.nom;

  try {
    const deletedemployeeSchema = await Employee.findOneAndDelete({ nom });

    if (!deletedemployeeSchema) {
      return res.status(404).json({ message: "employe not found" });
    }

    res.json({ message: "employe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Assuming you have an Express route for handling the update
app.put('/employee/:nom', async (req, res) => {
  try {
    const nom = req.params.nom;
    const updatedEmployeeData = req.body; // Updated data sent in the request body

    // Find the employee by their name (nom) and update their data
    const updatedEmployee = await Employee.findOneAndUpdate({ nom: nom }, updatedEmployeeData, { new: true });

    res.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get("/projet", async (req, res) => {
  try {
    const projets = await projet.find(); // Assuming your model name is Service
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Backend API endpoint to handle project selection
app.get("/projet/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await projet.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post("/affecter/emp", async (req, res) => {
  try {
    // Extract project ID and employee ID from the request body
    const { projectId, employeeId } = req.body;

    // Your logic to assign the employee to the project
    // This could involve updating the project document in the database with the employee ID

    // Send a response indicating success
    res.status(200).json({ message: "Employee assigned to project successfully" });
  } catch (error) {
    console.error('Error assigning employee to project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete("/service/:name", async (req, res) => {
  const name = req.params.name;

  try {
    // Find the service to be deleted
    const deletedService = await service.findOneAndDelete({ name });

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Delete associated categories
    await categorie.deleteMany({ serviceId: deletedService._id });

    res.json({ message: "Service and associated categories deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/client/add", async (req, res) => {
  //     try{var response = await personmodel.find({name : "%sa%"})
  //     res.json(response);
  // }catch (error){
  //     console.log()
  // }
  console.log(req.body);
  const { nom, prénom, email, password, numtel, adresse } = req.body;
  let newclient = client({
    nom: nom,
    prénom: prénom,
    email: email,
    password: password,
    numtel:numtel,
    adresse:adresse,
  });
  var response = await newclient.save();

  res.json(response);
});
app.get("/client", async (req, res) => {
  try {
    const clients = await client.find(); // Assuming your model name is Service
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.delete("/client/:nom", async (req, res) => {
  const nom= req.params.nom;

  try {
    const deletedclientSchema = await client.findOneAndDelete({ nom});

    if (!deletedclientSchema) {
      return res.status(404).json({ message: "client not found" });
    }

    res.json({ message: "client deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put('/service/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;

  try {
    const updatedservice = await service.findByIdAndUpdate(
      id,
      { $set: { name, description } },
      { new: true }
    );

    if (!updatedservice) {
      return res.status(404).json({ message: 'Chantier not found' });
    }

    res.status(200).json(updatedservice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.delete("/categorie/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const deletedcategorieSchema= await categorie.findOneAndDelete({ name });

    if (!deletedcategorieSchema) {
      return res.status(404).json({ message: "categorie not found" });
    }

    res.json({ message: "categorie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/categorie", async (req, res) => {
  try {
    const categories = await categorie.find(); // Assuming your model name is Service
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put("/categorie/:nom", async (req, res) => {
  const name = req.params.nom;
  const updatedFields = req.body; // Assuming you're sending all updated fields in the request body

  try {
    const updatedcategorie = await categorie.findOneAndUpdate(
      { name }, // Filter to find the chef by name
      { $set: updatedFields }, // Update all fields based on the provided data
      { new: true } // Return the updated document
    );

    if (!updatedcategorie) {
      return res.status(404).json({ message: "categorie not found" });
    }

    res.json({ message: "categorie updated", updatedcategorie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put("/service/:name", async (req, res) => {
  const name = req.params.name;
  const updatedFields = req.body; // Assuming you're sending all updated fields in the request body
  console.log("Name:", name);
  console.log("Updated Fields:", updatedFields);
  try {
    const updatedservice = await service.findOneAndUpdate(
      { name: name }, // Filter to find the service by name
      { $set: updatedFields }, // Update all fields based on the provided data
      { new: true } // Return the updated document
    );

    if (!updatedservice) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service updated", updatedservice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




app.put("service/:id", async (req, res) => {
  try {
    let result = await service.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res.send({ service: "result", msg: "service is updated" });
  } catch (error) {
    console.log(error);
  }
});
app.delete("/resclient/:id", async (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  console.log("id to be deleted =", id);

  try {
    const deletedresclient = await resclient.findOneAndDelete({ _id: id });

    if (!deletedresclient) {
      return res.status(404).json({ message: "resclient not found" });
    }

    res.json({ message: "ressclient deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/",cors(),(req,res)=>{

})


// app.post("/",async(req,res)=>{
//     const{email,password}=req.body

//     try{
//         const check=await client.findOne({email:email})

//         if(check){
//             res.json("exist")
//         }
//         else{
//             res.json("notexist")
//         }

//     }
//     catch(e){
//         res.json("fail")
//     }

// })
app.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await client.findOne({ email, password });

    if (user) {
      res.json({ status: 'exist', email, password, numtel: user.numtel, adresse: user.adresse, nom: user.nom, id:user._id });
    } else {
      res.json({ status: 'notexist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});




app.post("/signup", async (req, res) => {
  const { nom, prénom,  email, password,numtel, adresse, } = req.body;

  const data = {
      nom: nom,
      prénom: prénom,
      email: email,
      password: password,
      numtel: numtel,
      adresse: adresse
  };

  try {
      const check = await client.findOne({ email: email });

      if (check) {
          res.json("exist");
      } else {
          // Insert the new user data
          await client.insertMany([data]);
          // Send the response after successful insertion
          res.json("notexist");
      }
  } catch (e) {
      res.json("fail");
  }
});

app.put('/client/:id', async (req, res) => {
  const id = req.params.id;
  const { nom, prénom, email, password, numtel, adresse } = req.body;

  try {
    const updatedclient = await client.findByIdAndUpdate(
      id,
      { $set: { nom, prénom, email, password, numtel, adresse } },
      { new: true }
    );

    if (!updatedclient) {
      return res.status(404).json({ message: 'client not found' });
    }

    res.status(200).json(updatedclient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get("/client/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const clients = await client.findOne({ email: email });
    if (!clients) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/logadmin",cors(),(req,res)=>{

})

app.post("/logadmin",async(req,res)=>{
  const{username,password}=req.body

  try{
      const check=await admin.findOne({username:username})

      if(check){
          res.json("exist")
      }
      else{
          res.json("notexist")
      }

  }
  catch(e){
      res.json("fail")
  }

})


app.put('/resclient/:id', async (req, res) => {
  try {
    const { etat } = req.body;
    const { id } = req.params;

    // Update the projet with the provided ID to mark it as "refuse"
    await projet.findByIdAndUpdate(id, { etat: etat });

    res.json({ message: 'Projet marked as refused' });
  } catch (error) {
    console.error('Error marking projet as refused:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Assuming you're using Express.js
app.put('/resclient/:id/refuse', async (req, res) => {
  try {
    const { etat } = req.body; // Assuming the request body contains the new state
    const { id } = req.params; // Extract the reservation ID from the URL parameter

    // Update the reservation with the provided ID to mark it as "refused"
    // This depends on your database schema and how reservations are stored
    // Replace 'Reservation' with the appropriate model and method to update the state
    // For example, if you're using Mongoose, it might be Reservation.findByIdAndUpdate()
    // Make sure to handle errors appropriately
    // For example, if the reservation is not found, return a 404 error
    // If the update is successful, return a success message or the updated reservation
    // This example assumes you're using MongoDB with Mongoose
    const updatedReservation = await Reservation.findByIdAndUpdate(id, { etat: etat });

    res.json({ message: 'Reservation marked as refused', reservation: updatedReservation });
  } catch (error) {
    console.error('Error marking reservation as refused:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// app.post("/resclient/add", async (req, res) => {
//   try {
//     const { date, lieu, categorieId, clientId } = req.body;

//     // Validate clientId if necessary

//     // Ensure the appointment is associated with the correct user
//     const newresclient = new resclient({
//       date,
//       lieu,
//       categorieId,
//       clientId
//     });

//     // Save the appointment to the database
//     const savedresclient = await newresclient.save();

//     res.json(savedresclient);
//   } catch (error) {
//     console.error("Error creating appointment:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
app.post("/resrefuse/add", async (req, res) => {
  //     try{var response = await personmodel.find({name : "%sa%"})
  //     res.json(response);
  // }catch (error){
  //     console.log()
  // }
  console.log(req.body);
  const { date, lieu, categorieId,  clientId, etat } = req.body;
  let newresrefuse = resrefuse({
    
    date: date,
    lieu: lieu,
    categorieId:categorieId,
    clientId:clientId,
    etat: etat
  });
  var response = await newresrefuse.save();

  res.json(response);
});
app.get("/logchef",cors(),(req,res)=>{

})

app.post("/logchef",async(req,res)=>{
  const{email,password}=req.body

  try{
      const check=await Chefmodel.findOne({email:email})

      if(check){
          res.json("exist")
      }
      else{
          res.json("notexist")
      }

  }
  catch(e){
      res.json("fail")
  }

})

app.get("/services", async (req, res) => {
  try {
    // Fetch all services
    const services = await service.find();

    // Fetch categories for each service
    const servicesWithCategories = await Promise.all(service.map(async (service) => {
      const categories = await categorie.find({ serviceId: service._id });
      return {
        name: service.name,
        categories: categories.map(category => category.name)
      };
    }));

    res.json(servicesWithCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function countEmployees() {
  try {
    const employeeCount = await Employee.countDocuments();
    console.log("Total number of employees:", employeeCount);
    return employeeCount;
  } catch (err) {
    console.error("Error counting employees:", err);
    throw err;
  }
}

// Call the function
countEmployees();
app.get('/employees/count', async (req, res) => {
  try {
    const employeeCount = await Employee.countDocuments();
    res.json({ count: employeeCount });
  } catch (err) {
    console.error("Error counting employees:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/projects/inprogress/count', async (req, res) => {
  try {
    const inProgressProjectsCount = await projet.countDocuments({ etat: 'en cours' });
    res.json({ count: inProgressProjectsCount });
  } catch (err) {
    console.error("Error counting projects in progress:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/projects/completed/count', async (req, res) => {
  try {
    const completedProjectsCount = await projet.countDocuments({ etat: 'terminé' });
    res.json({ count: completedProjectsCount });
  } catch (err) {
    console.error("Error counting completed projects:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get('/services/count', async (req, res) => {
  try {
    const serviceCount = await service.countDocuments();
    res.json({ count: serviceCount });
  } catch (err) {
    console.error("Error counting services:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get('/chefs/count', async (req, res) => {
  try {
    const chefCount = await Chefmodel.countDocuments();
    res.json({ count: chefCount });
  } catch (err) {
    console.error("Error counting chefs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get('/resclients/count', async (req, res) => {
  try {
    const resClientCount = await resclient.countDocuments();
    res.json({ count: resClientCount });
  } catch (err) {
    console.error("Error counting resclients:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Assuming you have a router object


app.get('/chefs', async (req, res) => {
  const { categorieId } = req.query;

  try {
    const chefs = await Chefmodel.find({ categorieId }); // Query chefs by category ID
    res.json(chefs);
  } catch (error) {
    console.error('Error fetching chefs:', error);
    res.status(500).send('An error occurred while fetching chefs.');
  }
});


app.get('/employe', async (req, res) => {
  const { categorieId } = req.query;

  try {
    const employe = await Employee.find({ categorieId }); // Query chefs by category ID
    res.json(employe );
  } catch (error) {
    console.error('Error fetching employe:', error);
    res.status(500).send('An error occurred while fetching employe.');
  }
});

app.get('/projects/paused/count', async (req, res) => {
  try {
    const pausedProjectsCount = await projet.countDocuments({ etat: 'En pause' });
    res.json({ count: pausedProjectsCount });
  } catch (err) {
    console.error("Error counting paused projects:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/servicee/:id', async (req, res) => {
  try {
    const services = await service.findById(req.params.id);
    if (!services) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// app.put('/updateUser', async (req, res) => {
//   const { email, password, numtel, adresse } = req.body;

//   try {
//     const updatedUser = await client.findOneAndUpdate({ email }, { password, numtel, adresse }, { new: true });

//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(updatedUser);
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ error: 'Could not update user' });
//   }
// });
app.put('/updateUser', async (req, res) => {
  const { id, email, password, numtel, adresse } = req.body;

  try {
    // Retrieve the existing user from the database
    const existingUser = await client.findOne({id});

    // Check if the new email is different from the existing one
    if (existingUser && existingUser.email !== email) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Update the user's information
    const updatedUser = await client.findOneAndUpdate({_id : id}, { email ,password, numtel, adresse }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Could not update user' });
  }
});

// app.put('/updateUser', async (req, res) => {
//   const { email: newEmail, password, numtel, adresse } = req.body;

//   try {
//     // Retrieve the existing user from the database
//     const existingUser = await client.findOne({ email: newEmail });

//     // If the user exists and the email is different, return an error message
//     if (existingUser && existingUser.email !== newEmail) {
//       return res.status(400).json({ error: 'Email already in use' });
//     }

//     // Update the user's information
//     const updatedUser = await client.findOneAndUpdate(
//       { email: newEmail },
//       { password, numtel, adresse },
//       { new: true }
//     );

//     // If the user is not found, return an error message
//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Return the updated user information
//     return res.json(updatedUser);
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return res.status(500).json({ error: 'Could not update user' });
//   }
// });





