const db = require("../db/database-connection");

function formatDateToYMD(date) {
  return date.toISOString().split("T")[0];
}

exports.addExercise = (req, res, next) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;
  const { user } = req;

  const exerciseDate = date
    ? formatDateToYMD(new Date(date))
    : formatDateToYMD(new Date());

  try {
    const query = db.prepare(
      "INSERT INTO exercises (userId, description, duration, date) VALUES (?, ?, ?, ?)"
    );
    const exercise = query.run(_id, description, duration, exerciseDate);

    res.json({
      userId: user.id,
      exerciseId: exercise.lastInsertRowid,
      description,
      duration,
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
      query += " LIMIT ?";
      params.push(limit);
    }

    const exerciseLogs = db.prepare(query).all(...params);

    const countQuery =
      "SELECT COUNT(*) as count FROM exercises WHERE userId = ?";
    const totalCount = db.prepare(countQuery).get(_id).count;

    res.json({
      count: totalCount,
      logs: exerciseLogs.map((exercise) => ({
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
