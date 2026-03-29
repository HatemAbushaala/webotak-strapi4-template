module.exports = {
	/**
	 * removes all properties from an object except the ones provided in the array
	 * @param {object} object the object to be filtered
	 * @param {string[]} requiredProperties the attributes to be kept in the object
	 */
	filterObject: (object = {}, requiredProperties = []) => {
		if (object === null || object === undefined) return object;

		return Object.keys(object)
			.filter((key) => requiredProperties.includes(key))
			.reduce((obj, key) => {
				obj[key] = object[key];

				return obj;
			}, {});
	},

	/**
	 * removes the specified properties from the object
	 * @param {object} object the object to be filtered
	 * @param {string[]} requiredProperties the attributes to be deleted from the object
	 */
	filterObjectInverse: (object = {}, requiredProperties = []) => {
		if (object === null || object === undefined) return object;

		return Object.keys(object)
			.filter((key) => !requiredProperties.includes(key))
			.reduce((obj, key) => {
				obj[key] = object[key];

				return obj;
			}, {});
	},
	/**
	 * Checkes if the passed string, array, or object is undefined, null, or empty
	 * @param {object} value can be string|array|object
	 * @return {boolean} true if empty, null or undefined, false otherwise
	 */
	isNullOrEmpty: (value) => {
		// null check will work the same way for different types
		if (value === null || value === undefined) return true;

		if (typeof value === 'string' || Array.isArray(value)) {
			return value.length === 0;
		}

		if (typeof value === 'number' || typeof value === 'bigint') return false;

		return Object.keys(value).length === 0;
	},
	// keys used to compare only with specific keys
	isShallowEqual: (obj1, obj2, keys) => {
		// Get the property keys of both objects
		const keys1 = keys != null ? keys : Object.keys(obj1);
		const keys2 = keys != null ? keys : Object.keys(obj2);

		// If the number of properties is different, the objects are not equal
		if (keys1.length !== keys2.length) {
			return false;
		}

		// Iterate over the keys and compare the property values
		for (let key of keys1) {
			if (obj1[key] != obj2[key]) {
				return false;
			}
		}

		// If all property values are equal, the objects are considered equal
		return true;
	},
};
