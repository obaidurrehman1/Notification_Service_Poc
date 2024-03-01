const { Model } = require('objection');
const path = require('path');
class UserProfile extends Model {
	static get tableName() {
		return 'UserProfile';
	}

	static get idColumn() {
		return 'user_id';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'full_name',
				'email',
				// 'phone',
				// 'slack',
			],

			properties: {
				user_id: { type: 'integer' },
				full_name: { type: 'string' },
				email: { type: 'string' },
				phone: { type: ['string', 'null'] },
				slack: { type: ['string', 'null'] },
			},
		};
	}

	static get relationMappings() {
		return {
			user_teams: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'UserTeam'),
				join: {
					from: 'UserProfile.user_id',
					to: 'UserTeam.user_id',
				},
			},
		};
	}
}

module.exports = UserProfile;
