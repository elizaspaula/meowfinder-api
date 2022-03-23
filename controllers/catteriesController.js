const fs = require("fs");

//Get list of all catteries
const getAllCatteries = (req, res) => {
  fs.readFile("./data/catteries.json", "utf8", (err, data) => {
    const catteriesData = JSON.parse(data);
    if (err) {
      res.status(400).send("Error reading file");
    } else {
      res.json(catteriesData);
    }
  });
};

//Get a single cattery
const getCatteryById = (req, res) => {
  fs.readFile("./data/catteries.json", "utf8", (err, data) => {
    const catteriesData = JSON.parse(data);
    const foundCattery = catteriesData.find(
      (cattery) => (cattery.id = req.params.id)
    );
    if (foundCattery) {
      res.json(foundCattery);
    } else {
      console.log(err);
      res.status(400).send("No cattery found with this id");
    }
  });
};

//Create a new cattery
const createNewCattery = (req, res) => {
  const newCattery = {
    id: req.body.id,
    catteryName: req.body.catteryName,
    address: req.body.address,
    city: req.body.city,
    country: req.body.city,
    breed: req.body.breed,
    ticaRegistered: req.body.ticaRegistered,
    contact: {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      website: req.body.website,
      facebook: req.body.facebook,
      instragram: req.body.instragram,
    },
    gallery: {
      id: id.req.body.id,
      image: req.body.image,
    },
    documents: {
      id: id.body.id,
      document: req.body.document,
    },
    comments: {
      id: req.body.id,
      name: req.body.name,
      comment: req.body.comment,
    },
  };

  fs.readFile(".data/catteries.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).send("Error reading file");
    } else {
      const catteriesData = JSON.parse(data);
      catteriesData.unshift(newCattery);
      fs.writeFile(
        "./data/catteries.json",
        JSON.stringify(catteriesData),
        () => {
          res.send("Cattery has been added");
        }
      );
    }
  });
};

module.exports = { getAllCatteries, getCatteryById, createNewCattery };
