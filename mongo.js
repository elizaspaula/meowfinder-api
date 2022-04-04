const mongoose = require("mongoose");

async function connect() {
  return mongoose
    .connect("mongodb://localhost:27017/test")
    .catch((err) => console.log(err));
}

const catteriesSchema = new mongoose.Schema({
  id: String,
  user: String,
  catteryName: String,
  description: String,
  descriptionmobile: String,
  address: String,
  city: String,
  country: String,
  province: String,
  breed: String,
  registry: String,
  name: String,
  phone: String,
  email: String,
  website: String,
  facebook: String,
  instragram: String,
  picture: [String],
  document: String,
});

const Catteries = mongoose.model("Catteries", catteriesSchema);

const usersSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Users = mongoose.model("Users", usersSchema);

module.exports = {
  connect,
  Catteries,
  Users,
};
