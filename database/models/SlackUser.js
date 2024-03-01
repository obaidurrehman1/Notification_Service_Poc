const { Model } = require('objection');
const path = require('path');
class SlackUser extends Model {
	static get tableName() {
		return 'SlackUser';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			properties: {
				user_id: { type: 'integer' },
				tenant_id: { type: 'integer' },
				slack_user_id: { type: 'string' },
			},
		};
	}

	static get relationMappings() {
		return {
			slack_workspace: {
				relation: Model.BelongsToOneRelation,
				modelClass:path.join(__dirname, 'SlackWorkspace'),
				join: {
					from: 'SlackUser.slack_user_id',
					to: 'SlackWorkspace.slack_user_id',
				},
			},
		};
	}
}

module.exports = SlackUser;
