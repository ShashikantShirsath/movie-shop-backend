import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const {name, email, password, role} = req.body;
    if(!name || !email || !password) res.status(400).json({message: "Name, email and password are required"});
    const existingUser = await User.findOne({email: email});
    console.log(existingUser);
    if(existingUser) res.status(400).json({message: "User already exists"});

    const newUser = new User({
        name : name,
        email : email,
        password : password,
        role : role
    });

    await newUser.save();
    res.json({ message: "User registered", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "something went wrong while registering user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) res.status(400).json({message: "Email and password required"});
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(403).json({ message: "Invalid credentials" });

  const token = jwt.sign( { id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.status(201).json({ 
    token, 
    role: user.role,
    message: "Login successfully"
  });
};
