const objectMapper = (data, mapper) => {
	let mappedObject = {};
	for (const iterator of Object.entries(data)) {
		let [key, value] = iterator;
		const newKey = mapper[key];
		if (newKey) {
			if(typeof value === "string"){
				value = value.trim();
			}
			mappedObject[mapper[key]] = value;
		}
	}
	return mappedObject;
};

const listMapper = (data, map) => {
	let list = [];
	for (const iterator of data) {
		const user = objectMapper(iterator, map);
		list.push(user);
	}
	return list;
};

module.exports = {
	objectMapper,
	listMapper,
};
