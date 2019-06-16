const express = require("express");

// app
const app = express();

// route
app.get("/", (req, res) => {
  res.send("Taskma");
})

// listen to port
app.listen(4000, () => {
  console.log("server running on http://localhost:4000");
})