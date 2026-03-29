const { BaseSchema } = require('yup');

/**
 *
 * @param {BaseSchema} schema
 * @param {function} next
 * @returns
 */
const withValidation = (schema, next) => {
	return async (ctx) => {
		try {
			const result = await schema.validate(ctx.request.body, {
				// abort early to return all errors at once
				abortEarly: false,
				// this remove inputs not exist in schema
				stripUnknown: true,
			});
			// clear unkown inputs from request body
			ctx.request.body = result;
			// call request handler after successfully validating request body
		} catch (error) {
			const errors = getValidationErrors(error);
			return ctx.send(
				{
					errorCode: 'VALIDATION_ERRORS',
					errors,
					data: null,
					message: 'لم يتم ادخال المعلومات بشكل صحيح',
				},
				422
			);
		}

		return await next(ctx);
	};
};

const getValidationErrors = (err) => {
	const validationErrors = {};
	err.inner?.forEach((error) => {
		if (error.path) {
			validationErrors[error.path] = error.message;
		}
	});

	return validationErrors;
};

module.exports = {
	withValidation,
};
