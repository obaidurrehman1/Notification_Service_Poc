const { Model } = require('objection');
const path = require('path');
class Event extends Model {
	static get tableName() {
		return 'Event';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['name'],

			properties: {
				id: { type: 'integer' },
				name: { type: 'string' },
				// is_tenant_wide: { type: 'boolean', default: false },
				is_global: { type: 'boolean', default: false },
			},
		};
	}

	static get relationMappings() {
		return {
			subscriptions: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'Subscription'),
				join: {
					from: 'Event.id',
					to: 'Subscription.event_id',
				},
			},
			templates: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'Template'),
				join: {
					from: 'Event.id',
					to: 'Template.event_id',
				},
			},
		};
	}
}

module.exports = Event;