const _ = require('lodash')
const utils = require('@strapi/utils')
const { validateUpdateUserBody } = require('./validation')
const { sanitizeOutput, getService } = require('./helpers')
const { getAbsoluteAdminUrl, getAbsoluteServerUrl, sanitize } = utils
const { ApplicationError, ValidationError, ForbiddenError, NotFoundError, UnauthorizedError } = utils.errors

async function updateUser(ctx) {
	const advancedConfigs = await strapi.store({ type: 'plugin', name: 'users-permissions', key: 'advanced' }).get()

	const id = ctx.state.user?.id
	const { email, username, password } = ctx.request.body

	if (!id) {
		throw new UnauthorizedError('You are not allowed to update this user')
	}

	const user = await getService('user').fetch(id)
	if (!user) {
		throw new NotFoundError(`User not found`)
	}

	await validateUpdateUserBody(ctx.request.body)

	if (user.provider === 'local' && _.has(ctx.request.body, 'password') && !password) {
		throw new ValidationError('password.notNull')
	}

	if (_.has(ctx.request.body, 'username')) {
		const userWithSameUsername = await strapi.query('plugin::users-permissions.user').findOne({ where: { username } })

		if (userWithSameUsername && _.toString(userWithSameUsername.id) !== _.toString(id)) {
			throw new ApplicationError('Username already taken')
		}
	}

	if (_.has(ctx.request.body, 'email') && advancedConfigs.unique_email) {
		const userWithSameEmail = await strapi.query('plugin::users-permissions.user').findOne({ where: { email: email.toLowerCase() } })

		if (userWithSameEmail && _.toString(userWithSameEmail.id) !== _.toString(id)) {
			throw new ApplicationError('Email already taken')
		}
		ctx.request.body.email = ctx.request.body.email.toLowerCase()
	}

	const updateData = {
		...ctx.request.body,
	}

	const data = await getService('user').edit(user.id, updateData)
	const sanitizedData = await sanitizeOutput(data, ctx)

	if (data.role?.type === 'seller' && username) {
		// update seller profile username as well
		strapi.db
			.query('api::seller.seller')
			.update({
				where: {
					user: id,
				},
				data: {
					username,
				},
			})
			.catch((err) => {
				strapi.log.error('Failed to update seller profile username:', err)
			})
	}

	ctx.send(sanitizedData)
}

module.exports = updateUser
