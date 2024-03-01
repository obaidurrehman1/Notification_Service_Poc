const { Model } = require('objection');
const softDelete = require('objection-soft-delete');
const path = require('path');

class UserTeam extends softDelete({ columnName: 'deleted' })(Model) {
	static get tableName() {
		return 'UserTeam';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['user_id', 'team_id'],

			properties: {
				id: { type: 'integer' },
				user_id: { type: 'integer' },
				team_id: { type: 'integer' },
				deleted: { type: 'boolean' },
			},
		};
	}

	static get relationMappings() {
		return {
			user_profile: {
				relation: Model.HasOneRelation,
				modelClass: path.join(__dirname, 'UserProfile'),

				join: {
					from: 'UserTeam.user_id',
					to: 'UserProfile.id',
				},
			},
		};
	}
	static get modifiers() {
		return {
			notDeleted(builder) {
				builder.whereNotDeleted();
			},
			
		};
	}
}

module.exports = UserTeam;
