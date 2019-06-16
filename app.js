const express = require("express");
const userRoute = require("./routes/user");

// app
const app = express();

// routes
app.use("/", userRoute);

// listen to port
app.listen(4000, () => {
  console.log("server running on http://localhost:4000");
})