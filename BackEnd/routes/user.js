const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middleware/auth'); 

router.get("/all/", userController.findAllUsers)
router.get("/:id", userController.findOneUser)
router.delete("/", auth, userController.deleteOneUser)
router.delete("/:id", auth, userController.deleteMyAccount)

module.exports = router