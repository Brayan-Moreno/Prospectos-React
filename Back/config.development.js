module.exports ={
    api: {
		port: process.env.API_PORT || 3001,
		url: "http://localhost:3001",
	},
    sql_prospectos: {
        user: "sa",
        password: "Cinnamon03",
        server: "localhost",
        database: "ProspectosBD",
    },
}