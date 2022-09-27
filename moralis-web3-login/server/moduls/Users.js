const mangoose = require("mongoose");

const usersInfo = new mangoose.Schema({
  aggregateVerifier: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  typeOfLogin: {
    type: String,
  },
  verifierId: {
    type: String,
  },
});

const Users = mangoose.model("Users", usersInfo);
module.exports = Users;
