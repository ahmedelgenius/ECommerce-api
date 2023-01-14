module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (err.message === "Unexpected field") {
    err.message = "error Max Count 3 images";
  }

  if (process.env.MODE_ENV === "development") {
    devMode(err, res);
  } else {
    prodMode(err, res);
  }
};

const devMode = (err, res) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
    err,
    stack: err.stack,
  });
};
const prodMode = (err, res) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
};
