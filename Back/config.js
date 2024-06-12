
const NODE_ENV = process.env.NODE_ENV;

const development = require("./config.development");
const staging = require("./config.staging");
const production = require("./config.production");

let config;
switch (NODE_ENV) {
	case "staging":
		config = staging;
		break;
	case "production":
		config = production;
		break;
	default:
		config = development;
		break;
}

module.exports = config;