import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; 
    //res.send(verified);
    next();
  } catch (error) {
    return res.status(403).json({ error:error+token });
  }
};
