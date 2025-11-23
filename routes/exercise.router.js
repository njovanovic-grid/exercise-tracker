const excerciseController = require("../controllers/excercise.controller");

const express = require("express");
const router = express.Router({ mergeParams: true });

router.post("/exercises", excerciseController.addExercise);
router.get("/logs", excerciseController.getLogs);

module.exports = router;
