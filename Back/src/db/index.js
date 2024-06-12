const sql = require("mssql");
const { sql_prospectos: config } = require("../../config");

const mssql = {
	...config,
	options: {
		encrypt: false,
		trustServerCertificate: true, // change to true for local dev / self-signed certs
	},
	requestTimeout: 300000,
};

let sqldb = new sql.ConnectionPool(mssql);

const sqlconnect = new Promise((res, rej) => {
	sqldb
		.connect()
		.then(() => {
			console.log(`Connected to ${mssql.server}`);
			res(null);
		})
		.catch((err) => {
			console.log(`Failed to ${mssql.server}`);
		});
});

module.exports = {
	sqlconnect,
	sqldb,
	sql,
};
