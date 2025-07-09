const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));

app.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/getUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const users = await UserModel.findById({ _id: id });
    res.json(users);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(
      { _id: id },
      { name: req.body.name, email: req.body.email, age: req.body.age }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ress = await UserModel.findByIdAndDelete({ _id: id });
    res.json(ress);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/createUser", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
