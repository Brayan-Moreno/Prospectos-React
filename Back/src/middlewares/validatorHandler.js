function validatorHandler(schema, property) {
	return async (req, res, next) => {
		const data = req[property];
		const { success: successValidation, errors } = await schema.validate(data);
		if (!successValidation) {
			res
				.status(400)
				.send({ data: errors, message: "Validation falied", error: true });
			return;
		}
		next();
	};
}

module.exports = validatorHandler;