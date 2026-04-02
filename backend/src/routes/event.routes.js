const express = require("express");
const { authUser, authRole } = require("../middlewares/auth.middleware");
const { createEvent,getallEvent,deleteEvent,getEventById } = require("../controllers/event.controller");
const upload = require("../middlewares/multer");

const router = express.Router();





router.get("/",authUser,getallEvent)
router.get("/:id",authUser,getEventById);




router.post("/create",authUser,authRole("organizer"),upload.single("image"),createEvent);
router.delete("/:id",authUser,authRole("organizer"),deleteEvent);




module.exports = router;
