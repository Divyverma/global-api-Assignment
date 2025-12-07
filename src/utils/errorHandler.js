function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} does not exist`
  });
}


function globalErrorHandler(err, req, res, next) {
  console.error("Error:", err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.name || "Error",
    message: err.message || "Something went wrong",
    statusCode
  });
}

module.exports = {
  notFoundHandler,
  globalErrorHandler
};
