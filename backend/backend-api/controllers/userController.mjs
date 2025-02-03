import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { createUser, findUserByEmail } from "../models/userModel.mjs";


const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    await createUser({
      email,
      userId,     
      password: hashedPassword,
      name,
      profileImage: "",
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login Attempt: ", email);

    const user = await findUserByEmail(email);
    if (!user) {
      console.log("User Not Found");
      return res.status(400).json({ error: "User not found" });
    }

    console.log("Stored Hashed Password:", user.password);
    console.log("Entered Password:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password Mismatch");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("Generating JWT Token...");
    console.log("JWT_SECRET:", JWT_SECRET);

    const token = jwt.sign({ userId: user.userId, email: user.email }, JWT_SECRET, { expiresIn: "8h" });

    console.log("Token Generated Successfully:", token);

    res.json({ token, user });
  } catch (error) {
    console.error("Login Error: ", error);
   // res.status(500).json({ error: "Login failed" });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    console.log("Extracted email:", req.user.email); // Debugging

     //Use email as the primary key to find the user
    const user = await findUserByEmail(req.user.email); 
    if (!user) return res.status(404).json({ error: "User not found" });

    delete user.password; // Ensure password is not exposed
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to retrieve user profile" });
  }
};
