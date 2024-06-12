const { sqlconnect, sqldb, sql } = require("../db/index");
const mapper = require("../mappers/index");
const userService = require("../services/user.service");

async function debug() {
	try {
		console.log("Debug iniciado");
		//await testselect();
		// console.log(result);
	} catch (error) {
		console.log("🤡 ~ debug ~ error:", error);
	}
}

const testSql = async () => {
	await sqlconnect;
	const { recordset: result } = await sqldb.query(
		"select top 1 * from LINEAS (nolock)"
	);
	console.log("🤡 ~ testSql ~ result:", result);
};

const testMapper = () => {
	const user = mapper.objectMapper(
		{ name: "arath", firstLastName: "hernandez" },
		userService.USER_MAPPER.TO_DB
	);
	console.log("🤡 ~ testMapper ~ user:", user);

	const list = [
		{ nombre: "arath", appellidoPaterno: "hernandez" },
		{ nombre: "miguel", appellidoPaterno: "hull" },
	];
	const userList = mapper.listMapper(list, userService.USER_MAPPER.FROM_DB);
	console.log("🤡 ~ testMapper ~ userList:", userList);
};


module.exports = debug;
