const crypto = require('crypto')
const _ = require('lodash')
const { concat, compact, isArray } = require('lodash/fp')
const utils = require('@strapi/utils')
const getService = require('./getService')
const { yup, validateYupSchema } = require('@strapi/utils')

const { getAbsoluteAdminUrl, getAbsoluteServerUrl, sanitize } = utils
const { ApplicationError, ValidationError, ForbiddenError } = utils.errors

const callbackSchema = yup.object({
	identifier: yup.string().required(),
	password: yup.string().required(),
})
const validateCallbackBody = validateYupSchema(callbackSchema)

const callbackByRole = async function callback(ctx) {
	const provider = ctx.params.provider || 'local'
	const params = ctx.request.body
	const role = ctx.params.role

	const store = strapi.store({ type: 'plugin', name: 'users-permissions' })
	const advancedSettings = await store.get({ key: 'advanced' })

	const grantSettings = await store.get({ key: 'grant' })

	const grantProvider = provider === 'local' ? 'email' : provider

	if (!_.get(grantSettings, [grantProvider, 'enabled'])) {
		throw new ApplicationError('This provider is disabled')
	}

	const role_object = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: role || advancedSettings.default_role } })

	if (provider === 'local') {
		await validateCallbackBody(params)

		const { identifier } = params

		// Check if the user exists.
		const user = await strapi.query('plugin::users-permissions.user').findOne({
			where: {
				provider,
				role: role_object.id,
				$or: [{ email: identifier.toLowerCase() }, { username: identifier }],
			},
		})

		if (!user) {
			throw new ValidationError('Invalid identifier or password')
		}

		if (!user.password) {
			throw new ValidationError('Invalid identifier or password')
		}

		const validPassword = await getService('user').validatePassword(params.password, user.password)

		if (!validPassword) {
			throw new ValidationError('Invalid identifier or password')
		}

		const requiresConfirmation = _.get(advancedSettings, 'email_confirmation')

		if (requiresConfirmation) {
			if (user.confirmed !== true) {
				throw new ApplicationError('Your account email is not confirmed')
			}
		} else if (role === 'seller') {
			if (user.confirmed !== true) {
				throw new ApplicationError('Your account is not confirmed yet')
			}
		}

		if (user.blocked === true) {
			throw new ApplicationError('Your account has been blocked by an administrator')
		}

		return ctx.send({
			jwt: getService('jwt').issue({ id: user.id }),
			user: await sanitizeUser(user, ctx),
		})
	}

	// Connect the user with the third-party provider.
	try {
		const user = await getService('providers').connect(provider, ctx.query, { roleId: role_object.id })

		if (user.blocked) {
			throw new ForbiddenError('Your account has been blocked by an administrator')
		}

		return ctx.send({
			jwt: getService('jwt').issue({ id: user.id }),
			user: await sanitizeUser(user, ctx),
		})
	} catch (error) {
		throw new ApplicationError(error.message)
	}
}

const sanitizeUser = (user, ctx) => {
	const { auth } = ctx.state
	const userSchema = strapi.getModel('plugin::users-permissions.user')

	return sanitize.contentAPI.output(user, userSchema, { auth })
}

module.exports = callbackByRole
