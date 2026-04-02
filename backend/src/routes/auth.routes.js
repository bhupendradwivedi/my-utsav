const express = require("express");
const { registerUser, loginUser, getMe, logoutUser } = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middleware");
// const upload = require("../middlewares/multer");

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me",authUser,getMe );




module.exports = router;
    