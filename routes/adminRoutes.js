const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");
const fs = require("fs");

//Route to POST new cattery
router.post("/cattery", adminController.createNewCattery);

//Route to PUT a cattery
router.put("/cattery/:id", adminController.editCattery);

//Route to DELETE a cattery
router.delete("/cattery/:id", adminController.deleteCattery);

//Route to GET Single Cattery by
router.get("/", adminController.getCatteryByUser);

module.exports = router;
