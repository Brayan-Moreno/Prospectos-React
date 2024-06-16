const express = require("express");
const app = express();
const SCHEMAS = require("../schemas/prospects/index");
const validatorHandler = require("../middlewares/validateSchema");
const {
  getProspectsHandler,
  getDocumentsProspectHandler,
  updateStatusHandler,
  postProspectHandler,
  getCtlDocumentsHandler,
  getCtlStatusHandler,
} = require("../controllers/prospect.controller");

app.get("/", getProspectsHandler);
app.get("/documents", getDocumentsProspectHandler);
app.get("/documents-catalog", getCtlDocumentsHandler);
app.get("/status-catalog", getCtlStatusHandler);
app.post("/create", postProspectHandler);
app.patch("/prospect-status", updateStatusHandler);

module.exports = app;
