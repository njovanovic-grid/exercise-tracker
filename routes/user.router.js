const userController = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.post("/", userController.postUser);
router.get("/", userController.getUsers);

module.exports = router;
