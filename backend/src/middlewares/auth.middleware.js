const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// authUser Middleware
async function authUser(req, res, next) {
  
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.error("Error occurred in authUser:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

// authRole Middleware
function authRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden, you do not have required role." });
    }

    next();
  };
}

module.exports = { authUser, authRole };
