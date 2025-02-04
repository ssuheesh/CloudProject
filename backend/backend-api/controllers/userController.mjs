import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { createUser,updateUser, findUserByEmail } from "../models/userModel.mjs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

const s3 = new S3Client({ region: process.env.AWS_REGION });

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

export const signUp = async (req, res) => {
  const { email, password, name, profileImageName, contentType } = req.body;

  try {
  
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    let profileImageUrl = "";
    let uploadURL = "";
    if (profileImageName && contentType) {
      const uploadParams = {
        Bucket: S3_BUCKET_NAME,
        Key: `profiles/${userId}/${profileImageName}`,
        ContentType: contentType,
      };

      const command = new PutObjectCommand(uploadParams);
      uploadURL = await getSignedUrl(s3, command, { expiresIn: 300 });

  
      profileImageUrl = `https://${S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com/profiles/${userId}/${profileImageName}`;
    }

    const user = await findUserByEmail(email);
    if (user !== null) {
      if (user.email !== null) {
        return res.status(400).json({ error: "Email already exists" });
      }    
    }else{
      await createUser({
        email,
        userId,
        password: hashedPassword,
        name,
        profileImage: profileImageUrl || " ", 
      });
    }     

  
    res.status(201).json({
      message: "User registered successfully",
      uploadURL:  uploadURL || null,
    });
    
  } catch (error) {
    console.error("Signup Error:", error);
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
   // console.error("Login Error: ", error);
    res.status(500).json({ error: "Login failed" });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    console.log("Extracted email:", req.user.email); 

   
    const user = await findUserByEmail(req.user.email); 
    if (!user) return res.status(404).json({ error: "User not found" });

    delete user.password; 
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to retrieve user profile" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { email, name, password, profileImageName,contentType } = req.body;
    const user = await findUserByEmail(email);
   // const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let profileImageUrl = "";   
    let uploadURL = "";
    if (profileImageName !== null && profileImageName !== undefined && contentType !== null && contentType !== undefined) {
    const uploadParams = {
      Bucket: S3_BUCKET_NAME,
      Key: `profiles/${user.userId}/${profileImageName}`,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(uploadParams);    
     uploadURL = await getSignedUrl(s3, command, { expiresIn: 300 });
    profileImageUrl = `https://${S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com/profiles/${user.userId}/${profileImageName}`;
    }
    //profileImageUrl = `https://${S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com/profiles/${user.userId}/${profileImageName}`;
  
    const updatedData = {
      email: email || user.email,
      name: name || user.name,
      password: password ? await bcrypt.hash(password, 10) : user.password,
      profileImage: profileImageUrl || " ", 
    };

    await updateUser(email, updatedData);

    res.status(200).json({
      message: "Profile updated successfully",
      uploadURL: uploadURL || null,
    });

  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ error: "Error updating profile" });
  }
};
