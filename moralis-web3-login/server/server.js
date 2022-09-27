const express = require("express");
const app = express();
const mangoose = require("mongoose");
const cors = require("cors");
const UsersModel = require("./moduls/Users");

app.use(express.json());
app.use(cors());

mangoose.connect(
  "mongodb+srv://root:12345@moralis.eeg2lpi.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

//save data with email
app.post("/insert", async (req, res) => {
  const aggregateVerifier = req.body.aggregateVerifier;
  const email = req.body.email;
  const name = req.body.name;
  const profileImage = req.body.profileImage;
  const typeOfLogin = req.body.typeOfLogin;
  const verifierId = req.body.verifierId;
  const users = new UsersModel({
    aggregateVerifier: aggregateVerifier,
    email: email,
    name: name,
    profileImage: profileImage,
    typeOfLogin: typeOfLogin,
    verifierId: verifierId,
  });
  try {
    await users.save();
    res.send("data inserted");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("server runing");
});
