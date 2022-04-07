const { v4: uuidv4 } = require("uuid");
const { connect, Catteries } = require("../mongo");

//Route to create a new cattery
const createNewCattery = (req, res) => {
  const newCattery = new Catteries({
    id: uuidv4(),
    user: req.decode.email,
    catteryName: req.body.catteryName,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    province: req.body.province,
    breed: req.body.breed,
    registry: req.body.registry,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    website: req.body.website,
    facebook: req.body.facebook,
    instragram: req.body.instragram,
    picture: [],
    document: null,
  });

  if (req.files) {
    const { picture, document } = req.files;

    if (picture) {
      picture.forEach((element) => {
        element.mv("./public/uploads/" + element.name);
        newCattery.picture.push(element.name);
      });
    }

    if (document) {
      document?.mv("./public/uploads/" + document.name);
      newCattery.document = document.name;
    }
  }

  connect().then(() =>
    newCattery.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).send("Cattery has been added");
      }
    })
  );
};

//Route to edit one cattery
const editCattery = (req, res) => {
  const editNewCattery = {
    user: req.decode.email,
    catteryName: req.body.catteryName,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    province: req.body.province,
    breed: req.body.breed,
    registry: req.body.registry,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    website: req.body.website,
    facebook: req.body.facebook,
    instragram: req.body.instragram,
    picture: [],
    document: null,
  };
  if (req.files) {
    const { picture, document } = req.files;

    picture.forEach((element) => {
      element.mv("./public/uploads/" + element.name);
      editNewCattery.picture.push(element.name);
    });

    if (document) {
      document.mv("./public/uploads/" + document.name);
      editNewCattery.document = document.name;
    }
  }

  connect().then(async () => {
    try {
      const catteriesData = await Catteries.updateOne(
        {
          id: req.params.id,
          user: req.decode.email,
        },
        editNewCattery
      ).exec();
      res.json(catteriesData);
    } catch (err) {
      res.status(400).send("No cattery found with this id");
    }
  });
};

//Route to delete one cattery
const deleteCattery = (req, res) => {
  connect().then(async () => {
    try {
      const catteriesData = await Catteries.deleteOne({
        id: req.params.id,
        user: req.decode.email,
      }).exec();
      res.json(catteriesData);
    } catch (err) {
      res.status(400).send("No cattery found with this id");
    }
  });
};

// Route to get Catteries by User
const getCatteryByUser = (req, res) => {
  connect().then(async () => {
    try {
      const catteriesData = await Catteries.find({
        user: req.decode.email,
      }).exec();
      res.json(catteriesData);
    } catch (err) {
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
