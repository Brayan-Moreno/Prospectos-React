const express = require('express');
const app = express();
const prospectRoutes = require("../routes/prospects.routes")

app.use("/api/prospects", prospectRoutes)
module.exports = app;