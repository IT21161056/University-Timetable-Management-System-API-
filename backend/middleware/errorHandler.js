const { AppBaseError } = require("../exceptions/baseException");
const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${res.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );

  // console.log(err.stack);

  // const status = req.statusCode ?? 500; // server error

  // res.status(status);

  if (err instanceof AppBaseError) {
    res.json({
      message: err.message,
      status: err.status,
      type: err.type,
    });
    // Handle errors of type AppBaseError or its subclasses
  } else {
    res.json({
      message: "Soething went wrong",
      status: 500,
      type: "Internal Server Error",
    });
    // Handle other types of errors
  }
};

module.exports = errorHandler;
