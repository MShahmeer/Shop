const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "Development") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    //handling mongoose object Id error, passing the wrong ID with product
    if (err.name === "CastError") {
      const message = `Resourse not found. Invalid: ${err.path}`; //id is defined in path in postman you can see
      error = new ErrorHandler(message, 400);
    }

    //handling mongoose validation error
    if (err.name === "ValidationError") {
      const message = object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
