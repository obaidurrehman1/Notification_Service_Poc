const { Model } = require('objection');

class TenantProfile extends Model {
	static get tableName() {
		return 'TenantProfile';
	}

	static get idColumn() {
		return 'tenant_id';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [ 'name' ],

			properties: {
				tenant_id: { type: 'integer' },
				name: { type: 'string' },
				tenant_domain: { type: ['string', 'null'] },
				tenant_type: { type: ['string', 'null'] }
			},
		};
	}
}

module.exports = TenantProfile;
