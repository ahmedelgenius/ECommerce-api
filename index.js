const express = require("express");
const app = express();
const globalMiddlewareErr = require("./src/utils/globalMiddlewareErr");
require("dotenv").config({ path: "./src/config/.env" });
const port = process.env.PORT;
const morgan = require("morgan");
const { dbConnection } = require("./src/database/dbconnecation");
const AppError = require("./src/utils/AppError");
const { allRequires } = require("./src/utils/indexRouter");
// const allRequires = require("./src/utils/index.js");
app.use(express.json());
if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
}
// if (!fs.existsSync("./uploads")) {
//   fs.mkdirSync("./uploads");
// }
allRequires(app);
app.use(express.static("uploads"));
app.all("*", (req, res, next) => {
  next(
    new AppError(`can't find this route: ${req.originalUrl} on server`, 404)
  );
});
// global error handling middleware

dbConnection();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(globalMiddlewareErr);
