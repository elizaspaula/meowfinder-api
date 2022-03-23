const express = require("express");
const router = express.Router();
const catteriesController = require("../controllers/catteriesController");
const fs = require("fs");

//Route to GET collection of catteries as array of object
router.get("/", catteriesController.getAllCatteries);

module.exports = router;
