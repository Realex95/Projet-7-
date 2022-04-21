const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentController");
const auth = require('../middleware/auth'); 

router.get("/", commentController.findAllComment);
router.get("/:Messageid", commentCtrl.findOneComment);
router.post("/", auth, commentController.createComment);
router.delete("/", auth, commentController.deleteComment);

module.exports = router;