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
<<<<<<< HEAD
  collectionName: 'activities';
  info: {
    singularName: 'activity';
    pluralName: 'activities';
    displayName: 'activity';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    user: Attribute.Relation<
      'api::activity.activity',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    operation: Attribute.String;
    model: Attribute.String;
    payload: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::activity.activity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::activity.activity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
=======
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
>>>>>>> ckeditor
}

export interface ApiCategoryCategory extends Schema.CollectionType {
	collectionName: 'categories'
	info: {
		displayName: 'category'
		pluralName: 'categories'
		singularName: 'category'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::category.category', 'oneToOne', 'admin::user'> & Attribute.Private
		name: Attribute.String
		products: Attribute.Relation<'api::category.category', 'manyToMany', 'api::product.product'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::category.category', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface ApiLocaleTestLocaleTest extends Schema.CollectionType {
	collectionName: 'locale_tests'
	info: {
		displayName: 'locale-test'
		pluralName: 'locale-tests'
		singularName: 'locale-test'
	}
	options: {
		draftAndPublish: false
	}
	pluginOptions: {
		i18n: {
			localized: true
		}
	}
	attributes: {
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::locale-test.locale-test', 'oneToOne', 'admin::user'> & Attribute.Private
		editor: Attribute.RichText &
			Attribute.SetPluginOptions<{
				i18n: {
					localized: true
				}
			}>
		locale: Attribute.String
		localizations: Attribute.Relation<'api::locale-test.locale-test', 'oneToMany', 'api::locale-test.locale-test'>
		title: Attribute.String &
			Attribute.SetPluginOptions<{
				i18n: {
					localized: true
				}
			}>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::locale-test.locale-test', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface ApiLocalizationLocalization extends Schema.CollectionType {
	collectionName: 'localizations'
	info: {
		displayName: 'localization'
		pluralName: 'localizations'
		singularName: 'localization'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		ar: Attribute.Text
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::localization.localization', 'oneToOne', 'admin::user'> & Attribute.Private
		en: Attribute.Text
		key: Attribute.String
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::localization.localization', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface ApiOrderOrder extends Schema.CollectionType {
	collectionName: 'orders'
	info: {
		displayName: 'order'
		pluralName: 'orders'
		singularName: 'order'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		amount: Attribute.Decimal
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::order.order', 'oneToOne', 'admin::user'> & Attribute.Private
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::order.order', 'oneToOne', 'admin::user'> & Attribute.Private
	}
}

export interface ApiProductProduct extends Schema.CollectionType {
<<<<<<< HEAD
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'product';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    categories: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::category.category'
    >;
    variations: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::variation.variation'
    >;
    shipping_detail: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'api::shipping-detail.shipping-detail'
    >;
    test: Attribute.String;
    test2: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResourceResource extends Schema.CollectionType {
  collectionName: 'resources';
  info: {
    singularName: 'resource';
    pluralName: 'resources';
    displayName: 'Resource';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    md: Attribute.RichText;
    color: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    country: Attribute.String &
      Attribute.CustomField<'plugin::country-select.country'>;
    select: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['option1', 'option2', 'Third option:option3']
      >;
    enum_select: Attribute.Enumeration<['a', 'b', 'c']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::resource.resource',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::resource.resource',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
=======
	collectionName: 'products'
	info: {
		description: ''
		displayName: 'product'
		pluralName: 'products'
		singularName: 'product'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		categories: Attribute.Relation<'api::product.product', 'manyToMany', 'api::category.category'>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::product.product', 'oneToOne', 'admin::user'> & Attribute.Private
		name: Attribute.String
		shipping_detail: Attribute.Relation<'api::product.product', 'oneToOne', 'api::shipping-detail.shipping-detail'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::product.product', 'oneToOne', 'admin::user'> & Attribute.Private
		variations: Attribute.Relation<'api::product.product', 'oneToMany', 'api::variation.variation'>
	}
}

export interface ApiResourceResource extends Schema.CollectionType {
	collectionName: 'resources'
	info: {
		description: ''
		displayName: 'Resource'
		pluralName: 'resources'
		singularName: 'resource'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		color: Attribute.String & Attribute.CustomField<'plugin::color-picker.color'>
		country: Attribute.String & Attribute.CustomField<'plugin::country-select.country'>
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::resource.resource', 'oneToOne', 'admin::user'> & Attribute.Private
		enum_select: Attribute.Enumeration<['a', 'b', 'c']>
		md: Attribute.RichText
		select: Attribute.JSON & Attribute.CustomField<'plugin::multi-select.multi-select', ['option1', 'option2', 'Third option:option3']>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::resource.resource', 'oneToOne', 'admin::user'> & Attribute.Private
	}
>>>>>>> ckeditor
}

export interface ApiShippingDetailShippingDetail extends Schema.CollectionType {
	collectionName: 'shipping_details'
	info: {
		description: ''
		displayName: 'shipping-detail'
		pluralName: 'shipping-details'
		singularName: 'shipping-detail'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::shipping-detail.shipping-detail', 'oneToOne', 'admin::user'> & Attribute.Private
		height: Attribute.Integer
		product: Attribute.Relation<'api::shipping-detail.shipping-detail', 'oneToOne', 'api::product.product'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::shipping-detail.shipping-detail', 'oneToOne', 'admin::user'> & Attribute.Private
		weight: Attribute.Integer
		width: Attribute.Integer
	}
}

export interface ApiTestTest extends Schema.CollectionType {
<<<<<<< HEAD
  collectionName: 'tests';
  info: {
    singularName: 'test';
    pluralName: 'tests';
    displayName: 'test';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    updated: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::test.test', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::test.test', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
=======
	collectionName: 'tests'
	info: {
		description: ''
		displayName: 'test'
		pluralName: 'tests'
		singularName: 'test'
	}
	options: {
		draftAndPublish: true
	}
	pluginOptions: {
		i18n: {
			localized: true
		}
	}
	attributes: {
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::test.test', 'oneToOne', 'admin::user'> & Attribute.Private
		locale: Attribute.String
		localizations: Attribute.Relation<'api::test.test', 'oneToMany', 'api::test.test'>
		markdown: Attribute.RichText &
			Attribute.SetPluginOptions<{
				i18n: {
					localized: true
				}
			}>
		name: Attribute.String &
			Attribute.SetPluginOptions<{
				i18n: {
					localized: true
				}
			}>
		publishedAt: Attribute.DateTime
		updated: Attribute.String &
			Attribute.SetPluginOptions<{
				i18n: {
					localized: true
				}
			}>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::test.test', 'oneToOne', 'admin::user'> & Attribute.Private
	}
>>>>>>> ckeditor
}

export interface ApiVariationVariation extends Schema.CollectionType {
	collectionName: 'variations'
	info: {
		displayName: 'variation'
		pluralName: 'variations'
		singularName: 'variation'
	}
	options: {
		draftAndPublish: false
	}
	attributes: {
		createdAt: Attribute.DateTime
		createdBy: Attribute.Relation<'api::variation.variation', 'oneToOne', 'admin::user'> & Attribute.Private
		name: Attribute.String
		product: Attribute.Relation<'api::variation.variation', 'manyToOne', 'api::product.product'>
		updatedAt: Attribute.DateTime
		updatedBy: Attribute.Relation<'api::variation.variation', 'oneToOne', 'admin::user'> & Attribute.Private
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
<<<<<<< HEAD
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::route-permission.route-permission': PluginRoutePermissionRoutePermission;
      'api::activity.activity': ApiActivityActivity;
      'api::category.category': ApiCategoryCategory;
      'api::localization.localization': ApiLocalizationLocalization;
      'api::order.order': ApiOrderOrder;
      'api::product.product': ApiProductProduct;
      'api::resource.resource': ApiResourceResource;
      'api::shipping-detail.shipping-detail': ApiShippingDetailShippingDetail;
      'api::test.test': ApiTestTest;
      'api::variation.variation': ApiVariationVariation;
    }
  }
=======
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
			'api::locale-test.locale-test': ApiLocaleTestLocaleTest
			'api::localization.localization': ApiLocalizationLocalization
			'api::order.order': ApiOrderOrder
			'api::product.product': ApiProductProduct
			'api::resource.resource': ApiResourceResource
			'api::shipping-detail.shipping-detail': ApiShippingDetailShippingDetail
			'api::test.test': ApiTestTest
			'api::variation.variation': ApiVariationVariation
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
>>>>>>> ckeditor
}
