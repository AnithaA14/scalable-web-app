import User from "../models/User.js";
import { generateToken } from "../middleware/auth.js";

// Register
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({ token, user: user.toProfile() });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({ token, user: user.toProfile() });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
