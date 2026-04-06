import type { Attribute, Schema } from '@strapi/strapi'

export interface AdminApiToken extends Schema.CollectionType {
	collectionName: 'strapi_api_tokens'
	info: {
		description: ''
		displayName: 'Api Token'
		name: 'Api Token'
		pluralName: 'api-tokens'
		singularName: 'api-token'
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		accessKey: Attribute.String &
			Attribute.Required &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private
		description: Attribute.String &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}> &
			Attribute.DefaultTo<''>
		expiresAt: Attribute.DateTime
		lastUsedAt: Attribute.DateTime
		lifespan: Attribute.BigInteger
		name: Attribute.String &
			Attribute.Required &
			Attribute.Unique &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}>
		permissions: Attribute.Relation<'admin::api-token', 'oneToMany', 'admin::api-token-permission'>
		type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> & Attribute.Required & Attribute.DefaultTo<'read-only'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
	collectionName: 'strapi_api_token_permissions'
	info: {
		description: ''
		displayName: 'API Token Permission'
		name: 'API Token Permission'
		pluralName: 'api-token-permissions'
		singularName: 'api-token-permission'
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		action: Attribute.String &
			Attribute.Required &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private
		token: Attribute.Relation<'admin::api-token-permission', 'manyToOne', 'admin::api-token'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface AdminPermission extends Schema.CollectionType {
	collectionName: 'admin_permissions'
	info: {
		description: ''
		displayName: 'Permission'
		name: 'Permission'
		pluralName: 'permissions'
		singularName: 'permission'
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		action: Attribute.String &
			Attribute.Required &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}>
		actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>
		conditions: Attribute.JSON & Attribute.DefaultTo<[]>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private
		properties: Attribute.JSON & Attribute.DefaultTo<{}>
		role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>
		subject: Attribute.String &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface AdminRole extends Schema.CollectionType {
	collectionName: 'admin_roles'
	info: {
		description: ''
		displayName: 'Role'
		name: 'Role'
		pluralName: 'roles'
		singularName: 'role'
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		code: Attribute.String &
			Attribute.Required &
			Attribute.Unique &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private
		description: Attribute.String
		name: Attribute.String &
			Attribute.Required &
			Attribute.Unique &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}>
		permissions: Attribute.Relation<'admin::role', 'oneToMany', 'admin::permission'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private
		users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>
	}
}

export interface AdminTransferToken extends Schema.CollectionType {
	collectionName: 'strapi_transfer_tokens'
	info: {
		description: ''
		displayName: 'Transfer Token'
		name: 'Transfer Token'
		pluralName: 'transfer-tokens'
		singularName: 'transfer-token'
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		accessKey: Attribute.String &
			Attribute.Required &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private
		description: Attribute.String &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}> &
			Attribute.DefaultTo<''>
		expiresAt: Attribute.DateTime
		lastUsedAt: Attribute.DateTime
		lifespan: Attribute.BigInteger
		name: Attribute.String &
			Attribute.Required &
			Attribute.Unique &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}>
		permissions: Attribute.Relation<'admin::transfer-token', 'oneToMany', 'admin::transfer-token-permission'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
	collectionName: 'strapi_transfer_token_permissions'
	info: {
		description: ''
		displayName: 'Transfer Token Permission'
		name: 'Transfer Token Permission'
		pluralName: 'transfer-token-permissions'
		singularName: 'transfer-token-permission'
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		action: Attribute.String &
			Attribute.Required &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private
		token: Attribute.Relation<'admin::transfer-token-permission', 'manyToOne', 'admin::transfer-token'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface AdminUser extends Schema.CollectionType {
	collectionName: 'admin_users'
	info: {
		description: ''
		displayName: 'User'
		name: 'User'
		pluralName: 'users'
		singularName: 'user'
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private
		email: Attribute.Email &
			Attribute.Required &
			Attribute.Private &
			Attribute.Unique &
			Attribute.SetMinMaxLength<{
				minLength: 6
			}>
		firstname: Attribute.String &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}>
		isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
		lastname: Attribute.String &
			Attribute.SetMinMaxLength<{
				minLength: 1
			}>
		password: Attribute.Password &
			Attribute.Private &
			Attribute.SetMinMaxLength<{
				minLength: 6
			}>
		preferedLanguage: Attribute.String
		registrationToken: Attribute.String & Attribute.Private
		resetPasswordToken: Attribute.String & Attribute.Private
		roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> & Attribute.Private
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private
		username: Attribute.String
	}
}

export interface ApiActivityActivity extends Schema.CollectionType {
	collectionName: 'activities'
	info: {
		description: ''
		displayName: 'activity'
		pluralName: 'activities'
		singularName: 'activity'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::activity.activity', 'oneToOne', 'admin::user'> & Attribute.Private
		model: Attribute.String
		operation: Attribute.String
		payload: Attribute.JSON
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::activity.activity', 'oneToOne', 'admin::user'> & Attribute.Private
		user: Attribute.Relation<'api::activity.activity', 'oneToOne', 'plugin::users-permissions.user'>
	}
}

export interface ApiCategoryCategory extends Schema.CollectionType {
	collectionName: 'categories'
	info: {
		description: 'Top-level test classification (e.g., Hormones, Hematology)'
		displayName: 'Category'
		pluralName: 'categories'
		singularName: 'category'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::category.category', 'oneToOne', 'admin::user'> & Attribute.Private
		description: Attribute.Text
		name: Attribute.String & Attribute.Required & Attribute.Unique
		test_groups: Attribute.Relation<'api::category.category', 'oneToMany', 'api::test-group.test-group'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::category.category', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface ApiFavoriteGroupFavoriteGroup extends Schema.CollectionType {
	collectionName: 'favorite_groups'
	info: {
		description: 'Preset group of tests for quick order creation'
		displayName: 'Favorite Group'
		pluralName: 'favorite-groups'
		singularName: 'favorite-group'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::favorite-group.favorite-group', 'oneToOne', 'admin::user'> & Attribute.Private
		name: Attribute.String & Attribute.Required
		tests: Attribute.Relation<'api::favorite-group.favorite-group', 'manyToMany', 'api::test.test'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::favorite-group.favorite-group', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface ApiOrderItemOrderItem extends Schema.CollectionType {
	collectionName: 'order_items'
	info: {
		description: 'Individual test line within an order, holds result per test'
		displayName: 'Order Item'
		pluralName: 'order-items'
		singularName: 'order-item'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::order-item.order-item', 'oneToOne', 'admin::user'> & Attribute.Private
		normal_range_snapshot: Attribute.String
		order: Attribute.Relation<'api::order-item.order-item', 'manyToOne', 'api::order.order'>
		price_snapshot: Attribute.Decimal
		result: Attribute.Text
		status: Attribute.Enumeration<['pending', 'in_progress', 'completed']> & Attribute.DefaultTo<'pending'>
		test: Attribute.Relation<'api::order-item.order-item', 'manyToOne', 'api::test.test'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::order-item.order-item', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface ApiOrderOrder extends Schema.CollectionType {
	collectionName: 'orders'
	info: {
		description: 'Laboratory test order for a patient'
		displayName: 'Order'
		pluralName: 'orders'
		singularName: 'order'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::order.order', 'oneToOne', 'admin::user'> & Attribute.Private
		discount: Attribute.Decimal & Attribute.DefaultTo<0>
		discount_percentage: Attribute.Decimal & Attribute.DefaultTo<0>
		is_auto_approved: Attribute.Boolean & Attribute.DefaultTo<false>
		order_date: Attribute.DateTime & Attribute.Required
		order_items: Attribute.Relation<'api::order.order', 'oneToMany', 'api::order-item.order-item'>
		paid_amount: Attribute.Decimal & Attribute.DefaultTo<0>
		patient: Attribute.Relation<'api::order.order', 'manyToOne', 'api::patient.patient'>
		payment_status: Attribute.Enumeration<['unpaid', 'partially_paid', 'fully_paid']> & Attribute.Required & Attribute.DefaultTo<'unpaid'>
		referring_doctor: Attribute.String
		status: Attribute.Enumeration<['pending', 'sample_collected', 'completed', 'approved', 'delivered', 'cancelled']> &
			Attribute.Required &
			Attribute.DefaultTo<'pending'>
		total_price: Attribute.Decimal & Attribute.DefaultTo<0>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::order.order', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface ApiPatientPatient extends Schema.CollectionType {
	collectionName: 'patients'
	info: {
		description: 'Patient records'
		displayName: 'Patient'
		pluralName: 'patients'
		singularName: 'patient'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::patient.patient', 'oneToOne', 'admin::user'> & Attribute.Private
		date_of_birth: Attribute.Date & Attribute.Required
		gender: Attribute.Enumeration<['male', 'female']> & Attribute.Required
		name: Attribute.String & Attribute.Required
		orders: Attribute.Relation<'api::patient.patient', 'oneToMany', 'api::order.order'>
		phone: Attribute.String
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::patient.patient', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface ApiTestGroupTestGroup extends Schema.CollectionType {
	collectionName: 'test_groups'
	info: {
		description: 'Sub-grouping of tests within a category (e.g., Thyroid under Hormones)'
		displayName: 'Test Group'
		pluralName: 'test-groups'
		singularName: 'test-group'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		category: Attribute.Relation<'api::test-group.test-group', 'manyToOne', 'api::category.category'>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::test-group.test-group', 'oneToOne', 'admin::user'> & Attribute.Private
		description: Attribute.Text
		name: Attribute.String & Attribute.Required
		tests: Attribute.Relation<'api::test-group.test-group', 'oneToMany', 'api::test.test'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::test-group.test-group', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface ApiTestTest extends Schema.CollectionType {
	collectionName: 'tests'
	info: {
		description: 'Individual lab test (e.g., Free Triiodothyronine, CBC)'
		displayName: 'Test'
		pluralName: 'tests'
		singularName: 'test'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		code: Attribute.String & Attribute.Unique
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::test.test', 'oneToOne', 'admin::user'> & Attribute.Private
		name: Attribute.String & Attribute.Required
		normal_range: Attribute.String
		price: Attribute.Decimal & Attribute.Required & Attribute.DefaultTo<0>
		test_group: Attribute.Relation<'api::test.test', 'manyToOne', 'api::test-group.test-group'>
		tube: Attribute.Relation<'api::test.test', 'manyToOne', 'api::tube.tube'>
		unit: Attribute.String
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::test.test', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface ApiTubeTube extends Schema.CollectionType {
	collectionName: 'tubes'
	info: {
		description: 'Specimen collection tube type (e.g., EDTA, Serum Separator)'
		displayName: 'Tube'
		pluralName: 'tubes'
		singularName: 'tube'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		color: Attribute.String
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::tube.tube', 'oneToOne', 'admin::user'> & Attribute.Private
		description: Attribute.Text
		name: Attribute.String & Attribute.Required & Attribute.Unique
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::tube.tube', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
	collectionName: 'strapi_releases'
	info: {
		displayName: 'Release'
		pluralName: 'releases'
		singularName: 'release'
	}
	options: {
		draftAndPublish: false
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		actions: Attribute.Relation<'plugin::content-releases.release', 'oneToMany', 'plugin::content-releases.release-action'>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> & Attribute.Private
		name: Attribute.String & Attribute.Required
		releasedAt: Attribute.DateTime
		scheduledAt: Attribute.DateTime
		status: Attribute.Enumeration<['ready', 'blocked', 'failed', 'done', 'empty']> & Attribute.Required
		timezone: Attribute.String
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface PluginContentReleasesReleaseAction extends Schema.CollectionType {
	collectionName: 'strapi_release_actions'
	info: {
		displayName: 'Release Action'
		pluralName: 'release-actions'
		singularName: 'release-action'
	}
	options: {
		draftAndPublish: false
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		contentType: Attribute.String & Attribute.Required
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'plugin::content-releases.release-action', 'oneToOne', 'admin::user'> & Attribute.Private
		entry: Attribute.Relation<'plugin::content-releases.release-action', 'morphToOne'>
		isEntryValid: Attribute.Boolean
		locale: Attribute.String
		release: Attribute.Relation<'plugin::content-releases.release-action', 'manyToOne', 'plugin::content-releases.release'>
		type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'plugin::content-releases.release-action', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface PluginI18NLocale extends Schema.CollectionType {
	collectionName: 'i18n_locale'
	info: {
		collectionName: 'locales'
		description: ''
		displayName: 'Locale'
		pluralName: 'locales'
		singularName: 'locale'
	}
	options: {
		draftAndPublish: false
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		code: Attribute.String & Attribute.Unique
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private
		name: Attribute.String &
			Attribute.SetMinMax<
				{
					max: 50
					min: 1
				},
				number
			>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface PluginRoutePermissionRoutePermission extends Schema.CollectionType {
	collectionName: 'route_permissions'
	info: {
		displayName: 'route-permission'
		pluralName: 'route-permissions'
		singularName: 'route-permission'
	}
	options: {
		comment: ''
		draftAndPublish: false
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		action: Attribute.String
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'plugin::route-permission.route-permission', 'oneToOne', 'admin::user'> & Attribute.Private
		role: Attribute.Relation<'plugin::route-permission.route-permission', 'oneToOne', 'plugin::users-permissions.role'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'plugin::route-permission.route-permission', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface PluginUploadFile extends Schema.CollectionType {
	collectionName: 'files'
	info: {
		description: ''
		displayName: 'File'
		pluralName: 'files'
		singularName: 'file'
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		alternativeText: Attribute.String
		caption: Attribute.String
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private
		ext: Attribute.String
		folder: Attribute.Relation<'plugin::upload.file', 'manyToOne', 'plugin::upload.folder'> & Attribute.Private
		folderPath: Attribute.String &
			Attribute.Required &
			Attribute.Private &
			Attribute.SetMinMax<
				{
					min: 1
				},
				number
			>
		formats: Attribute.JSON
		hash: Attribute.String & Attribute.Required
		height: Attribute.Integer
		mime: Attribute.String & Attribute.Required
		name: Attribute.String & Attribute.Required
		previewUrl: Attribute.String
		provider: Attribute.String & Attribute.Required
		provider_metadata: Attribute.JSON
		related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>
		size: Attribute.Decimal & Attribute.Required
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private
		url: Attribute.String & Attribute.Required
		width: Attribute.Integer
	}
}

export interface PluginUploadFolder extends Schema.CollectionType {
	collectionName: 'upload_folders'
	info: {
		displayName: 'Folder'
		pluralName: 'folders'
		singularName: 'folder'
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		children: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.folder'>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private
		files: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.file'>
		name: Attribute.String &
			Attribute.Required &
			Attribute.SetMinMax<
				{
					min: 1
				},
				number
			>
		parent: Attribute.Relation<'plugin::upload.folder', 'manyToOne', 'plugin::upload.folder'>
		path: Attribute.String &
			Attribute.Required &
			Attribute.SetMinMax<
				{
					min: 1
				},
				number
			>
		pathId: Attribute.Integer & Attribute.Required & Attribute.Unique
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface PluginUsersPermissionsPermission extends Schema.CollectionType {
	collectionName: 'up_permissions'
	info: {
		description: ''
		displayName: 'Permission'
		name: 'permission'
		pluralName: 'permissions'
		singularName: 'permission'
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		action: Attribute.String & Attribute.Required
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> & Attribute.Private
		role: Attribute.Relation<'plugin::users-permissions.permission', 'manyToOne', 'plugin::users-permissions.role'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
	collectionName: 'up_roles'
	info: {
		description: ''
		displayName: 'Role'
		name: 'role'
		pluralName: 'roles'
		singularName: 'role'
	}
	pluginOptions: {
		'content-manager': {
			visible: false
		}
		'content-type-builder': {
			visible: false
		}
	}
	attributes: {
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> & Attribute.Private
		description: Attribute.String
		name: Attribute.String &
			Attribute.Required &
			Attribute.SetMinMaxLength<{
				minLength: 3
			}>
		permissions: Attribute.Relation<'plugin::users-permissions.role', 'oneToMany', 'plugin::users-permissions.permission'>
		type: Attribute.String & Attribute.Unique
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> & Attribute.Private
		users: Attribute.Relation<'plugin::users-permissions.role', 'oneToMany', 'plugin::users-permissions.user'>
	}
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
	collectionName: 'up_users'
	info: {
		description: ''
		displayName: 'User'
		name: 'user'
		pluralName: 'users'
		singularName: 'user'
	}
	options: {
		draftAndPublish: false
		timestamps: true
	}
	attributes: {
		blocked: Attribute.Boolean & Attribute.DefaultTo<false>
		confirmationToken: Attribute.String & Attribute.Private
		confirmed: Attribute.Boolean & Attribute.DefaultTo<false>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private
		email: Attribute.Email &
			Attribute.Required &
			Attribute.SetMinMaxLength<{
				minLength: 6
			}>
		password: Attribute.Password &
			Attribute.Private &
			Attribute.SetMinMaxLength<{
				minLength: 6
			}>
		provider: Attribute.String
		resetPasswordToken: Attribute.String & Attribute.Private
		role: Attribute.Relation<'plugin::users-permissions.user', 'manyToOne', 'plugin::users-permissions.role'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private
		username: Attribute.String &
			Attribute.Required &
			Attribute.Unique &
			Attribute.SetMinMaxLength<{
				minLength: 3
			}>
	}
}

declare module '@strapi/types' {
	export module Shared {
		export interface ContentTypes {
			'admin::api-token': AdminApiToken
			'admin::api-token-permission': AdminApiTokenPermission
			'admin::permission': AdminPermission
			'admin::role': AdminRole
			'admin::transfer-token': AdminTransferToken
			'admin::transfer-token-permission': AdminTransferTokenPermission
			'admin::user': AdminUser
			'api::activity.activity': ApiActivityActivity
			'api::category.category': ApiCategoryCategory
			'api::favorite-group.favorite-group': ApiFavoriteGroupFavoriteGroup
			'api::order-item.order-item': ApiOrderItemOrderItem
			'api::order.order': ApiOrderOrder
			'api::patient.patient': ApiPatientPatient
			'api::test-group.test-group': ApiTestGroupTestGroup
			'api::test.test': ApiTestTest
			'api::tube.tube': ApiTubeTube
			'plugin::content-releases.release': PluginContentReleasesRelease
			'plugin::content-releases.release-action': PluginContentReleasesReleaseAction
			'plugin::i18n.locale': PluginI18NLocale
			'plugin::route-permission.route-permission': PluginRoutePermissionRoutePermission
			'plugin::upload.file': PluginUploadFile
			'plugin::upload.folder': PluginUploadFolder
			'plugin::users-permissions.permission': PluginUsersPermissionsPermission
			'plugin::users-permissions.role': PluginUsersPermissionsRole
			'plugin::users-permissions.user': PluginUsersPermissionsUser
		}
	}
}
