const fs = require("fs");
//Create a new cattery
const createNewCattery = (req, res) => {
  const newCattery = {
    id: req.body.id,
    user: req.decode.email,
    catteryName: req.body.catteryName,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    province: req.body.province,
    breed: req.body.breed,
    // ticaRegistered: req.body.ticaRegistered,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    website: req.body.website,
    facebook: req.body.facebook,
    instragram: req.body.instragram,
    // gallery: {
    //   id: id.req.body.id,
    //   image: req.body.image,
    // },
    // documents: {
    //   id: id.body.id,
    //   document: req.body.document,
    // },
    // comments: {
    //   id: req.body.id,
    //   name: req.body.name,
    //   comment: req.body.comment,
    // },
  };

  fs.readFile("./data/catteries.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      const catteriesData = JSON.parse(data);
      catteriesData.push(newCattery);
      fs.writeFile(
        "./data/catteries.json",
        JSON.stringify(catteriesData),
        (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            res.status(200).send("Cattery has been added");
          }
        }
      );
    }
  });
};

//Edit one cattery
const editCattery = (req, res) => {
  fs.readFile("./data/catteries.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      const catteryData = JSON.parse(data);
      const id = catteryData.findIndex(
        (cattery) =>
          cattery.id === req.params.id && cattery.user === req.decode.email
      );

      if (id >= 0) {
        catteryData[id]["catteryName"] = req.body.catteryName;
        catteryData[id]["address"] = req.body.address;
        catteryData[id]["city"] = req.body.city;
        catteryData[id]["country"] = req.body.country;
        catteryData[id]["province"] = req.body.province;
        catteryData[id]["description"] = req.body.description;
        catteryData[id]["breed"] = req.body.breed;
        catteryData[id]["ticaRegistered"] = req.body.ticaRegistered;
        catteryData[id]["name"] = req.body.name;
        catteryData[id]["email"] = req.body.email;
        catteryData[id]["phone"] = req.body.phone;
        catteryData[id]["website"] = req.body.website;
        catteryData[id]["facebook"] = req.body.facebook;
        catteryData[id]["instagram"] = req.body.instagram;

        fs.writeFile(
          "./data/catteries.json",
          JSON.stringify(catteryData),
          () => {
            res.send("Cattery has been update");
          }
        );
      } else {
        res.status(404).send("This cattery doesn't exist in the database");
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
        "./data/catteries.json",
        JSON.stringify(updateCatteryData),
        () => {
          res.json(updateCatteryData);
        }
      );
    }
  });
};

// GET Single Cattery by User
const getCatteryByUser = (req, res) => {
  fs.readFile("./data/catteries.json", "utf8", (err, data) => {
    const catteriesData = JSON.parse(data);
    const foundCattery = catteriesData.filter(
      (cattery) => cattery.user === req.decode.email
    );
    if (foundCattery) {
      res.json(foundCattery);
    } else {
      console.log(err);
      res.status(400).send("No cattery found with this id");
    }
  });
};

module.exports = {
  createNewCattery,
  editCattery,
  deleteCattery,
  getCatteryByUser,
};
