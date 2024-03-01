const { Model } = require('objection');
const path = require('path');
class Method extends Model {
	static get tableName() {
		return 'Method';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [ 'name' ],

			properties: {
				id: { type: 'integer' },
				name: { type: 'string' }
			},
		};
	}

	static get relationMappings() {
		return {
			templates: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'Template'),
				join: {
					from: 'Method.id',
					to: 'Template.method_id',
				},
			},
		};
	}
	
}

module.exports = Method;
