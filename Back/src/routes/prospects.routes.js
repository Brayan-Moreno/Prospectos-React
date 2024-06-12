const express = require("express");
const app = express();
const SCHEMAS = require("../schemas/prospects/index")
const validatorHandler = require("../middlewares/validateSchema");


app.get("/")

module.exports = app