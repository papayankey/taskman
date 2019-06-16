const express = require("express");
const path = require("path");

const Database = require("./models/database");
const schema = require("./models/schema");
const userRoute = require("./routes/user");

// environment variables
require("dotenv").config();

// connect db (Dao = Database Access Object)
const Dao = new Database(process.env.DB_PATH, schema);

Dao.db.on("error", error => {
  console.log(error.message);
}).on("open", async () => {
  console.log("Database connection successful");

  // app
  const app = express();

  // middlewares
  app.disable("x-powered-by");
  app.use(express.static(path.resolve(__dirname, "public")));
  app.set("view engine", "pug");


  // routes
  app.use("/", userRoute);


  // listen to port
  app.listen(process.env.APP_PORT, () => {
    console.log(`server running on http://localhost:${process.env.APP_PORT}`);
  })
});

