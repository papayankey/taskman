const express = require("express");
const path = require("path");

const userRoute = require("./routes/user");


// app
const app = express();

// middlewares
app.disable("x-powered-by");
app.use(express.static(path.resolve(__dirname, "public")));
app.set("view engine", "pug");


// routes
app.use("/", userRoute);

// listen to port
app.listen(4000, () => {
  console.log("server running on http://localhost:4000");
})