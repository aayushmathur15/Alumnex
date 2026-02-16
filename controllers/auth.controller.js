const admin = require("../config/firebase");
const User = require("../models/User.model");
const generateToken = require("../utils/generateToken");

exports.firebaseLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "No token provided" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { email, name } = decodedToken;

    // 🔒 Restrict to university email
    if (!email.endsWith("@university.edu")) {
      return res.status(403).json({
        message: "Only university emails allowed",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        role: "alumni", // We can improve role logic later
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Invalid Firebase token",
    });
  }
};

const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "tpo", // or set manually
    });

    const token = generateToken(user);

    res.status(201).json({ token, user });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({ token, user });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
