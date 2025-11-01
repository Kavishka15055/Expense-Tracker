const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    // Check if req.body exists and has data
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing." });
    }

    const { fullName, email, password, profileImageUrl } = req.body;

    // Validation: Check for missing fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Create the user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    // Return success response
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
    const {email, password} = req.body; 
    if(!email || !password) {
        return res.status(400).json({message:"All fields are required."});
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: "Invalid credentials"});
        }

        res.status(200).json({
        id:user._id,
        user,
        token: generateToken(user._id),
    });
    } catch (err) {
        res
            .status(500)
            .json({message: "Error registering user", error: err.message});
    }
};

// Get User Info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user info:", err.message);
    res.status(500).json({
      message: "Error fetching user info",
      error: err.message,
    });
  }
};
