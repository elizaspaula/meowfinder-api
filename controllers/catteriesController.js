const { connect, Catteries } = require("../mongo");

//Get list of all catteries
const getAllCatteries = (req, res) => {
  connect().then(async () => {
    try {
      const catteriesData = await Catteries.find({}).exec();
      res.json(catteriesData);
    } catch (err) {
      res.status(400).send("Error reading file");
    }
  });
};

//Get a single cattery
const getCatteryById = (req, res) => {
  connect().then(async () => {
    try {
      const catteriesData = await Catteries.findOne({
        id: req.params.id,
      }).exec();
      res.json(catteriesData);
    } catch (err) {
      res.status(400).send("No cattery found with this id");
    }
  });
};

//Get a single cattery by prov and breed
const getCatteryByBreedProvince = (req, res) => {
  connect().then(async () => {
    try {
      const catteriesData = await Catteries.find({
        breed: req.params.breed,
        province: req.params.province,
      }).exec();
      res.json(catteriesData);
    } catch (err) {
      res.status(400).send("No cattery found with this id");
    }
  });
};

module.exports = {
  getAllCatteries,
  getCatteryById,
  getCatteryByBreedProvince,
};
