"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const { mysql } = require("../../config");
const db = {};
let sequelize;

async function connect() {
	sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, mysql);
	try {
		await sequelize.authenticate();
		console.log(`Connection has been established successfully`);

		console.log("Host: ", mysql.host);
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

connect();

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;