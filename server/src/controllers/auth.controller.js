import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWToken } from "../config/auth.js";

// Register
export const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;
    console.log("Received registration data:", { name, email });

    // if (!name || !email || !password) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    // if(name.length < 3) {
    //   return res.status(400).json({ message: "Name must be at least 3 characters long" });
    // }

    // if(password.length < 6) {
    //   return res.status(400).json({ message: "Password must be at least 6 characters long" });
    // }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await generateJWToken({ id: user._id, role: user.role });
    console.log("Registered user:", user);
    console.log("token :",token)

   return res.status(201).json({ message: "User registered successfully", success: true, user , token });
  } catch (error) {
   return res.status(500).json({ error: error.message ,success: false});
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found",success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials", success: false });

    const token = await generateJWToken({ id: user._id, role: user.role });
    return res.json({ message: "Login successful!", token , user , success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message , success: false });
  }
};