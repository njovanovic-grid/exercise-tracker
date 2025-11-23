const db = require("../db/database-connection");

exports.addExercise = (req, res, next) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  if (!description || !duration) {
    return res
      .status(400)
      .json({ error: "Description and duration are required" });
  }

  const exerciseDate = date
    ? new Date(date).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  try {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const stmt = db.prepare(
      "INSERT INTO exercises (userId, description, duration, date) VALUES (?, ?, ?, ?)"
    );
    const info = stmt.run(_id, description, duration, exerciseDate);

    res.json({
      userId: user.id,
      exerciseId: info.lastInsertRowid,
      description,
      duration: parseInt(duration),
      date: exerciseDate,
    });
  } catch (err) {
    next(err);
  }
};

exports.getLogs = (req, res, next) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;

  try {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let query = "SELECT * FROM exercises WHERE userId = ?";
    const params = [_id];

    if (from) {
      query += " AND date >= ?";
      params.push(from);
    }
    if (to) {
      query += " AND date <= ?";
      params.push(to);
    }

    query += " ORDER BY date ASC";

    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum)) {
        query += " LIMIT ?";
        params.push(limitNum);
      }
    }

    const logs = db.prepare(query).all(...params);
    const totalCount = db
      .prepare("SELECT COUNT(*) as count FROM exercises WHERE userId = ?")
      .get(_id).count;

    res.json({
      count: totalCount,
      logs: logs.map((exercise) => ({
        id: exercise.id,
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date,
      })),
    });
  } catch (err) {
    next(err);
  }
};
