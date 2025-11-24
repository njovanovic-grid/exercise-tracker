const db = require("../db/database-connection");

exports.postUser = (req, res, next) => {
  const username = req.body.username.trim();

  try {
    const query = db.prepare("INSERT INTO users (username) VALUES (?)");
    const user = query.run(username);

    res.json({ id: user.lastInsertRowid, username });
  } catch (err) {
    if (err.message.includes("UNIQUE")) {
      return res.status(400).json({ error: "Username already exists" });
    }
    next(err);
  }
};

exports.getUsers = (_req, res, next) => {
  try {
    const query = db.prepare("SELECT id, username FROM users");
    const users = query.all();

    res.json(users);
  } catch (err) {
    next(err);
  }
};
