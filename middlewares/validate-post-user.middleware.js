function validatePostUserMiddleware(req, res, next) {
  const { username } = req.body;
  if (!username || typeof username !== "string" || username.trim() === "") {
    return res
      .status(400)
      .json({ error: "Username is required and must be a non-empty string" });
  }
  next();
}

module.exports = validatePostUserMiddleware;
