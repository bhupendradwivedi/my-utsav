const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const uploadKit = require("../services/servicesStorage");

async function registerUser(req, res) {

  const { name, email, password, role } = req.body;
  // const file = req.file;

  try {
    const isUserExist = await userModel.findOne({
      $or: [{ name }, { email }],
    });
    
    if (isUserExist) {
      return res.status(422).json({
        message:
          isUserExist.username == username
            ? "username already exist"
            : "Email already exist",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    // const fileurl = await uploadKit(file.buffer);

    const user = await userModel.create({
      name,
      email,
      password: hash,
      role,
      // image:fileurl
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(201).json({
      success:true,
      message: "User registerd successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error occured in registering user");
    res.status(500).json({
      success:false,
      message: "Internal Server error.Could not register user.",
      error: error.message,
    });
  }
}

async function loginUser(req, res) {
  const { name, email, password } = req.body;

  const isRegistered = await userModel.findOne({
    $or: [{ name }, { email }],
  });

  if (!isRegistered) {
    return res.status(401).json({ message: "Unathorized ! Register First" });
  }

  const isPassValid = await bcrypt.compare(password, isRegistered.password);

  if (!isPassValid) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign({ id: isRegistered._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    message: "User logged in Succesfully",
    user: {
      name: isRegistered.name,
      email: isRegistered.email,
      role: isRegistered.role,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token").json({ message: "Logged Out successfully" });
}

async function getMe(req, res) {
  try {
    const user = req.user; // from authUser middleware
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in getMe:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

module.exports = { registerUser, loginUser, logoutUser, getMe };
