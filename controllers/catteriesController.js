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

//Edit one cattery
const editCattery = (req, res) => {
  fs.readFile("./data/catteries.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).send("Error reading file");
    } else {
      const catteryData = JSON.parse(data);
      const id = catteriesData.find((cattery) => {
        cattery.id = req.params.id;
      });

      if (id >= 0) {
        (catteryData[id]["catteryName"] = req.body.catteryName),
          (catteryData[id]["address"] = req.body.address),
          (catteryData[id]["city"] = req.body.city),
          (catteryData[id]["country"] = req.body.country),
          (catteryData[id]["breed"] = req.body.breed),
          (catteryData[id]["ticaRegistered"] = req.body.ticaRegistered),
          (catteryData[id]["contact"]["name"] = req.body.name),
          (catteryData[id]["contact"]["phone"] = req.body.phone),
          (catteryData[id]["contact"]["website"] = req.body.website),
          (catteryData[id]["contact"]["facebook"] = req.body.facebook),
          (catteryData[id]["contact"]["instagram"] = req.body.instragram);
      }
    }
  });
};

//Delete one cattery
const deleteCattery = (req, res) => {
  fs.readFile("./data/catteries.json", "utf8", (err, data) => {
    if (err) {
      console.log;
      res.status(400).send("Error reading file");
    } else {
      const catteriesData = JSON.parse(data);
      const updateCatteryData = catteriesData.filter((cattery) => {
        return cattery.id !== req.params.id;
      });
      fs.writeFile(
        ".data/catteries.json",
        JSON.stringify(updateCatteryData),
        () => {
          res.JSON(updateCatteryData);
        }
      );
    }
  });
};

module.exports = {
  getAllCatteries,
  getCatteryById,
  createNewCattery,
  editCattery,
  deleteCattery,
};
