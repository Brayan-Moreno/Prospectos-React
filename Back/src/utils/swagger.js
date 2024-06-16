const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("../../config");
const { port, url } = config.api;
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Prospectos Web API",
			version: "0.1.0",
			description: "",
		},
		components: {
			securitySchemes: {
				ApiKeyAuth: {
					type: "apiKey",
					in: "header",
					name: "authorization",
				},
			},
		},
		// security: [
		// 	{
		// 		ApiKeyAuth: [],
		// 	},
		// ],
		servers: [{ url }],
	},
	apis: ["./src/docs/*yaml"],
};

const specs = swaggerJsdoc(options);

function swaggerDocs(app, port) {
	app.use(
		"/api-docs",
		swaggerUi.serve,
		swaggerUi.setup(specs, { explorer: true })
	);
}

module.exports = swaggerDocs;