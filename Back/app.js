const express = require("express");
const logger = require("morgan");
const http = require("http");
const routes = require("./src/routes/index");
const swaggerDocs = require("./src/utils/swagger");
const cors = require("cors");
const config = require("./config");
const port = config.api.port;
const app = express();
const server = http.createServer(app);
const errorHandler = require("./src/middlewares/errorHandler");

app.use(logger("dev"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use("/cdn", express.static("cdn"));

app.use(function (req, res, next) {
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Origin", "*");

	next();
});

app.use("/", routes);
app.use(errorHandler)

server.listen(port, () => {
	console.log(`Server started at port ${port}`);
	swaggerDocs(app, port);
});


module.exports = app;

