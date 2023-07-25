const express = require("express");
const cors = require("cors");
const app = express();
// Require the routes
const indexRoutes = require('./routes/users.routes.js');

// Enable cors
app.use(cors());

// Process json
app.use(express.json())

// Add routes
app.use('/', indexRoutes);

module.exports = app;