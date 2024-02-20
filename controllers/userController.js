const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const createUser = async (req, res) => {
  if (req.user.role !== "Admin") return res.sendStatus(403);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User.create({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role || "User",
    });
    await user.save();
    res.status(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  if (req.user.role !== "Admin") return res.sendStatus(403);
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  if (req.user.role !== "Admin") return res.sendStatus(403);
  try {
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUser = async (req, res) => {
  res.send("You are Welcome!");
};

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   return res.status(400).json({ error: "Username already exists" });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: "User",
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  registerUser,
};
