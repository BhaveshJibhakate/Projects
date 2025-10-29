const jwt = require("jsonwebtoken");

// this middleware is to just check if the user have token or not 
const authmiddleware = (req, resp, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return resp.status(401).json({ message: "Authorization header missing" });
    }
    const parts = authHeader.split(" ");
    const token = parts[1];
   if(!token){
    resp.statu(401).json({message:"Token missing"})
   }
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    resp.statu(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authmiddleware;
