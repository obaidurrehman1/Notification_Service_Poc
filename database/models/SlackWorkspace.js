const { Model } = require('objection');
const path = require('path');

class SlackWorkspace extends Model {
	static get tableName() {
		return 'SlackWorkspace';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['slack_user_id'],

			properties: {
				access_token: { type: 'string' },
				scope: { type: 'string' },
				slack_user_id: { type: 'string' },
				slack_team_id: { type: 'string' },
				slack_enterprise_id: { type: ['string', 'null'] },
				slack_team_name: { type: 'string' },
			},
		};
	}

	static get relationMappings() {
		return {
			users: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'SlackUser'),
				join: {
					from: 'SlackWorkspace.slack_user_id',
					to: 'SlackUser.slack_user_id',
				},
			},
		};
	}

}

module.exports = SlackWorkspace;
