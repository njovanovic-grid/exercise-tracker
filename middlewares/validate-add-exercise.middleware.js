const validateDateString = require("../utils/validate-date-string");

function validateAddExerciseMiddleware(req, res, next) {
  const { description, duration, date } = req.body;

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return res.status(400).json({
      error: "`description` is required and must be a non-empty string",
    });
  }

  const durationNum = parseInt(duration, 10);
  if (isNaN(durationNum) || durationNum <= 0) {
    return res.status(400).json({
      error: "`duration` is required and must be a positive number",
    });
  }

  if (date && !validateDateString(date)) {
    return res.status(400).json({
      error: "`date` must be a valid date in YYYY-MM-DD format",
    });
  }

  next();
}

module.exports = validateAddExerciseMiddleware;
