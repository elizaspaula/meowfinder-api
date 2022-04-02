const express = require("express");
const app = express();
const catteriesRoutes = require("./routes/catteriesRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
require("dotenv").config(); // load .env variables
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 5050;

//Middleware
app.use(express.json()); // add req.body
app.use(cors()); // allow cross-origin resource sharing
app.use(express.static("./public")); // adds public folder for serving images
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Public Route
app.use("/catteries", catteriesRoutes);

//Private Route
app.use((req, res, next) => {
  // Signup and login are public URLs that don't require a token
  if (req.url === "/signup" || req.url === "/login") {
    next();
  } else {
    // Format of request is BEARER <token>. Splitting on ' ' will create an
    // array where the token is at index 1
    const token = getToken(req);

    if (token) {
      // console.log("Auth Token:", token);

      if (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) {
        // Decode the token to pass along to end-points that may need
        // access to data stored in the token.
        req.decode = jwt.decode(token);
        next();
      } else {
        res.status(403).json({ error: "Not Authorized." });
      }
    } else {
      res.status(403).json({ error: "No token. Unauthorized." });
    }
  }
});

app.use("/admin", adminRoutes);

function getToken(req) {
  return req.headers.authorization.split(" ")[1];
}

app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };

  fs.readFile("./data/user.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      const userData = JSON.parse(data);
      userData.push(newUser);
      fs.writeFile(
        "./data/user.json",
        JSON.stringify(userData),
        (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            res.status(200).send("User has been added");
          }
        }
      );
    }
  });
});

app.post("/login", (req, res) => {
  fs.readFile("./data/user.json", "utf8", (err, data) => {
    const userData = JSON.parse(data);
    const foundUser = userData.find(
      (user) =>
        user.email === req.body.email && user.password === req.body.password
    );
    if (foundUser) {
      res.json({
        token: jwt.sign(
          { email: foundUser.email },
          process.env.ACCESS_TOKEN_SECRET
        ),
      });
    } else {
      console.log(err);
      res.status(400).send("No user was found with this email or password");
    }
  });
});

// app.get("/profile", (req, res) => {
//   res.json(req.decode);
// });

// -- express--file upload

// app.post("/picture", async (req, res) => {
//   try {
//     if (!req.files) {
//       res.send({
//         status: false,
//         message: "No files",
//       });
//     } else {
//       const { picture } = req.files;

//       picture.mv("./public/uploads/" + picture.name);

//       res.send({
//         status: true,
//         message: "File is uploaded",
//       });
//     }
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// Listening
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
