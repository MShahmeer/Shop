const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//setting up config file
dotenv.config({ path: "backend/config/config.env" });

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to uncaught exceptions error");
  process.exit(1);
});

//console.log(a); uncaught exceptions
//connecting to the database
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//handling unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
