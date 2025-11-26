const userController = require("../controllers/user.controller");

const validatePostUserMiddleware = require("../middlewares/validate-post-user.middleware");

const express = require("express");
const router = express.Router();

router.post("/", validatePostUserMiddleware, userController.postUser);
router.get("/", userController.getUsers);

module.exports = router;
