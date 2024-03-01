const { Model } = require('objection');
const path = require('path');

class Template extends Model {
	static get tableName() {
		return 'Template';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [ 'notification_template' ],
			properties: {
				notification_template: { type: 'string' },
				method_id: { type: 'integer' },
				event_id: { type: 'integer' },
			},
		};
	}

	static get relationMappings() {
		return {
			method: {
				relation: Model.BelongsToOneRelation,
				modelClass:path.join(__dirname, 'Method'),
				join: {
					from: 'Template.method_id',
					to: 'Method.id',
				},
			},
			event: {
				relation: Model.BelongsToOneRelation,
				modelClass:path.join(__dirname, 'Event'),
				join: {
					from: 'Template.event_id',
					to: 'Event.id',
				},
			},
		};
	}
}

module.exports = Template;