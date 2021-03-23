const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const express = require("express");

const app = express(); // initialize app

const config = {
  views: "views", // Set views directory
  static: "public", // Set static assets directory
  logging: true,
}; // set the view engine to ejs
app.set("view engine", "ejs");

vertex.configureApp(app, config);

// import routes
const index = require("./routes/index");

// set routes
app.use("/", index);

module.exports = app;
