const validateDateString = require("../utils/validate-date-string");

function validateGetLogsMiddleware(req, res, next) {
  const { from, to, limit } = req.query;

  if (from && !validateDateString(from)) {
    return res
      .status(400)
      .json({ error: "`from` must be a valid date in YYYY-MM-DD format" });
  }

  if (to && !validateDateString(to)) {
    return res
      .status(400)
      .json({ error: "`to` must be a valid date in YYYY-MM-DD format" });
  }

  if (limit) {
    const limitNum = parseInt(limit, 10);
    if (isNaN(limitNum) || limitNum <= 0) {
      return res
        .status(400)
        .json({ error: "`limit` must be a positive number" });
    }
  }

  next();
}

module.exports = validateGetLogsMiddleware;
