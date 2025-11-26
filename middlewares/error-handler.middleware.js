function errorHandlerMiddleware(err, req, res, next) {
  console.error(err);

  if (err.status && err.status < 500) {
    return res.status(err.status).json({ error: err.message });
  }

  return res.status(500).json({
    error: "Internal Server Error",
  });
}

module.exports = errorHandlerMiddleware;
