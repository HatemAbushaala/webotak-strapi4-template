import type { Attribute, Schema } from '@strapi/strapi'

export interface ComponentsComp extends Schema.Component {
	collectionName: 'components_components_comps'
	info: {
		displayName: 'comp'
	}
	attributes: {
		name: Attribute.String
	}
}

export interface ComponentsEditor extends Schema.Component {
	collectionName: 'components_components_editors'
	info: {
		description: ''
		displayName: 'editor'
	}
	attributes: {
		editor2: Attribute.RichText
		richText: Attribute.RichText
	}
}

declare module '@strapi/types' {
	export module Shared {
		export interface Components {
			'components.comp': ComponentsComp
			'components.editor': ComponentsEditor
		}
	}
}
