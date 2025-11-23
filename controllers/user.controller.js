const db = require("../db/database-connection");

exports.postUser = (req, res, next) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const stmt = db.prepare("INSERT INTO users (username) VALUES (?)");
    const info = stmt.run(username);

    res.json({ id: info.lastInsertRowid, username });
  } catch (err) {
    if (err.message.includes("UNIQUE")) {
      return res.status(400).json({ error: "Username already exists" });
    }
    next(err);
  }
};

exports.getUsers = (_req, res, next) => {
  try {
    const stmt = db.prepare("SELECT id, username FROM users");
    const users = stmt.all();

    res.json(users);
  } catch (err) {
    next(err);
  }
};
