const fs = require("fs");

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

module.exports = { getAllCatteries };
