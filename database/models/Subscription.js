const { Model } = require('objection');
const path = require('path');

class Subscription extends Model {
	static get tableName() {
		return 'Subscription';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['user_id', 'tenant_id', 'method_id', 'event_id'],

			properties: {
				id: { type: 'integer' },
				user_id: { type: 'integer' },
				tenant_id: { type: 'integer' },
				method_id: { type: 'integer' },
				event_id: { type: 'integer' },
			},
		};
	}

	static get relationMappings() {
		return {
			user_profile: {
				relation: Model.HasOneRelation,
				modelClass: path.join(__dirname, 'UserProfile'),

				join: {
					from: 'Subscription.user_id',
					to: 'UserProfile.user_id',
				},
			},

			user_teams: {
				relation: Model.ManyToManyRelation,
				modelClass: path.join(__dirname, 'UserTeam'),
				join: {
					from: 'Subscription.user_id',
					through: {
						from: 'UserProfile.user_id',
						to: 'UserProfile.user_id',
					},
					to: 'UserTeam.user_id',
				},
			},

			event: {
				relation: Model.BelongsToOneRelation,
				modelClass: path.join(__dirname, 'Event'),
				join: {
					from: 'Subscription.event_id',
					to: 'Event.id',
				},
			},

			method: {
				relation: Model.BelongsToOneRelation,
				modelClass: path.join(__dirname, 'Method'),
				join: {
					from: 'Subscription.method_id',
					to: 'Method.id'
				}
			}
		};
	}
}

module.exports = Subscription;
