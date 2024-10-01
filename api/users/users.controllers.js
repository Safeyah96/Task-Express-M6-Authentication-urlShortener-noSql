const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Require jsonwebtoken

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (error) {
    // Handle errors and return appropriate response
    res.status(500).json({
      error: "An error occurred during signup",
      details: error.message,
    });
  }
};

// These environment variables should be in your .env file
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Replace with a real secret in production
const JWT_TOKEN_EXP = process.env.JWT_TOKEN_EXP || "1h"; // Replace with your desired token expiry

// Function to generate a token
const generateToken = (user) => {
  // Create payload with the user's username and _id
  const payload = {
    username: user.username,
    _id: user._id,
  };

  // Sign the token with the payload, secret, and expiration
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_TOKEN_EXP });
};

// Signup controller
const signup = async (req, res) => {
  try {
    const { password } = req.body;

    // Hash the password with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    // Create the new user
    const newUser = await User.create(req.body);

    // Generate the token
    const token = generateToken(newUser);

    // Return the token in the response
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    // Handle errors and return appropriate response
    res
      .status(500)
      .json({
        error: "An error occurred during signup",
        details: error.message,
      });
  }
};

module.exports = { signup };
