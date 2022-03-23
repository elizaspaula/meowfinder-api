const express = require("express");
const app = express();
const catteriesRoutes = require("./routes/catteriesRoutes");
const cors = require("cors");
require("dotenv").config(); // load .env variables
const PORT = process.env.PORT || 5050;

//Middleware
app.use(express.json()); // add req.body
app.use(cors()); // allow cross-origin resource sharing
app.use(express.static("public")); // adds public folder for serving images

// home route
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// //Routing
app.use("/catteries", catteriesRoutes);

// Listening
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
