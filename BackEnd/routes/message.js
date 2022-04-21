const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');  
const messageController = require("../controllers/messageController");
const multer = require("../middleware/multer-config");

router.post("/", auth,multer, messageController.createMessage); 
router.get("/all/:id", messageController.findAllMessagesForOne);
router.get("/:id", messageController.findOneMessage);
router.get("/", messageController.findAllMessages);
router.delete("/", auth, messageController.deleteMessage);

module.exports = router;