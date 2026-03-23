export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // log full stack to console
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};