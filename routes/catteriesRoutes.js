const express = require("express");
const router = express.Router();
const catteriesController = require("../controllers/catteriesController");
const fs = require("fs");

//Route to GET collection of catteries as array of object
router.get("/", catteriesController.getAllCatteries);

//Route to GET single cattery by ID
router.get("/:id", catteriesController.getCatteryById);

//Route to GET single cattery by breed and province
router.get("/:breed/:province", catteriesController.getCatteryByBreedProvince);

//Route to POST new cattery
router.post("/", catteriesController.createNewCattery);

//Route to PUT a cattery
router.put("/edit/:id", catteriesController.editCattery);

//Route to DELETE a cattery
router.delete("/:id", catteriesController.deleteCattery);

module.exports = router;
