const db = require("../db/database-connection");

function validateUserExistsMiddleware(req, res, next) {
  try {
    const { _id } = req.params;
    const query = "SELECT * FROM users WHERE id = ?";
    const user = db.prepare(query).get(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = validateUserExistsMiddleware;
