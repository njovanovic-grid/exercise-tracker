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
    const query =
      "INSERT INTO exercises (userId, description, duration, date) VALUES (?, ?, ?, ?)";
    const exercise = db
      .prepare(query)
      .run(_id, description, duration, exerciseDate);

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
    const params = [_id];

    let filterQuery = " WHERE userId = ?";

    if (from) {
      filterQuery += " AND date >= ?";
      params.push(from);
    }

    if (to) {
      filterQuery += " AND date <= ?";
      params.push(to);
    }

    let countQuery = "SELECT COUNT(*) as count FROM exercises" + filterQuery;
    const totalCount = db.prepare(countQuery).get(...params).count;

    filterQuery += " ORDER BY date ASC";

    if (limit) {
      filterQuery += " LIMIT ?";
      params.push(limit);
    }

    let query =
      "SELECT id, description, duration, date FROM exercises" + filterQuery;
    const exerciseLogs = db.prepare(query).all(...params);

    res.json({
      count: totalCount,
      logs: exerciseLogs,
    });
  } catch (err) {
    next(err);
  }
};
