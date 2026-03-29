const utils = require('@strapi/utils')
const { sanitize, validate } = utils

const sanitizeOutput = async (user, ctx) => {
	const schema = strapi.getModel('plugin::users-permissions.user')
	const { auth } = ctx.state

	return sanitize.contentAPI.output(user, schema, { auth })
}

const validateQuery = async (query, ctx) => {
	const schema = strapi.getModel('plugin::users-permissions.user')
	const { auth } = ctx.state

	return validate.contentAPI.query(query, schema, { auth })
}

const sanitizeQuery = async (query, ctx) => {
	const schema = strapi.getModel('plugin::users-permissions.user')
	const { auth } = ctx.state

	return sanitize.contentAPI.query(query, schema, { auth })
}

const getService = (name) => {
	return strapi.plugin('users-permissions').service(name)
}

module.exports = { sanitizeOutput, validateQuery, sanitizeQuery, getService }
