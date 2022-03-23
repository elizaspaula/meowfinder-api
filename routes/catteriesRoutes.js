const express = require("express");
const router = express.Router();
const catteriesController = require("../controllers/catteriesController");
const fs = require("fs");

//Route to GET collection of catteries as array of object
router.get("/", catteriesController.getAllCatteries);

//Route to GET single cattery by ID
router.get("/:id", catteriesController.getCatteryById);

//Route to POST new cattery
router.post("/", catteriesController.createNewCattery);

module.exports = router;
