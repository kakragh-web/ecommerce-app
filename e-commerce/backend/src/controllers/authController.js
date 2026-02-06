import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const userCount = await User.countDocuments();
    const role = userCount === 0 || email === 'admin@example.com' ? 'admin' : 'user';
    
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      role 
    });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const googleCallback = async (req, res) => {
  const token = jwt.sign({ userId: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  const userData = encodeURIComponent(JSON.stringify({ id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role }));
  res.redirect(`${process.env.CLIENT_URL}?token=${token}&user=${userData}`);
};

export const facebookCallback = async (req, res) => {
  const token = jwt.sign({ userId: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  const userData = encodeURIComponent(JSON.stringify({ id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role }));
  res.redirect(`${process.env.CLIENT_URL}?token=${token}&user=${userData}`);
};