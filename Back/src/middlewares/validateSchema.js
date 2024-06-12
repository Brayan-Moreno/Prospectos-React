function validatorHandler(schema, property) {
	return async (req, res, next) => {
		try {
			const data = req[property];
			await schema.validate(data);

			next();
		} catch (error) {
			console.log("🤡 ~ return ~ error:", error);

			res.status(400).send({
				data: error.errors,
				message: "Error en la validación de datos.",
				success: false,
			});
			return;
		}
	};
}

module.exports = validatorHandler;