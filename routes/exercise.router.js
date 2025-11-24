const exerciseController = require("../controllers/exercise.controller");

const validateGetLogsMiddleware = require("../middlewares/validate-get-logs.middleware");
const validateAddExerciseMiddleware = require("../middlewares/validate-add-exercise.middleware");
const validateUserExistsMiddleware = require("../middlewares/validate-user-exists.middleware");

const express = require("express");
const router = express.Router({ mergeParams: true });

router.use(validateUserExistsMiddleware);

router.post(
  "/exercises",
  validateAddExerciseMiddleware,
  exerciseController.addExercise
);
router.get("/logs", validateGetLogsMiddleware, exerciseController.getLogs);

module.exports = router;
