const express = require('express');
const app = express();
const prospectRoutes = require("./prospect.routes")

app.use("/api/prospect", prospectRoutes)
module.exports = app;