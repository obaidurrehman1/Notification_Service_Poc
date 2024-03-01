/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema
		.createTable('TenantProfile', (table) => {
			table.integer('tenant_id').primary();
			table.string('name');
			table.string('tenant_domain');
			table.string('tenant_type');
		})
		.createTable('UserProfile', (table) => {
			table.integer('user_id').primary();
			table.string('full_name');
			table.string('email');
			table.string('phone');
			table.string('slack');
			table.boolean('is_active').defaultTo(false);
		})
		.createTable('Method', (table) => {
			table.increments();
			table.string('name').notNullable().unique();
		})
		.createTable('Event', (table) => {
			table.increments('id');
			table.string('name').notNullable().unique();
			table.boolean('is_global').default(false);
			table.specificType('required_roles', 'integer ARRAY');
			table.boolean('is_team_specific').notNullable().defaultTo(false);
			table.boolean('is_user_specific').notNullable().defaultTo(false);
		})
		.createTable('Subscription', (table) => {
			table.increments();
			table
				.integer('user_id')
				.references('user_id')
				.inTable('UserProfile')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table
				.integer('tenant_id')
				.references('tenant_id')
				.inTable('TenantProfile')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table
				.integer('method_id')
				.references('id')
				.inTable('Method')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table
				.integer('event_id')
				.references('id')
				.inTable('Event')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table.unique(['user_id', 'tenant_id', 'method_id', 'event_id']);
		})
		.createTable('UserTeam', (table) => {
			table.increments();
			table.integer('user_id')
				.references('user_id')
				.inTable('UserProfile')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
				.notNullable();
			table.integer('team_id').notNullable();
			table.boolean('deleted').defaultTo(false);
			table.unique(['user_id', 'team_id']);
		})
		.createTable('SlackWorkspace', (table) => {
			table.increments();
			table.string('access_token');
			table.string('scope');
			table.string('slack_user_id').unique().notNullable();
			table.string('slack_team_id');
			table.string('slack_enterprise_id');
			table.string('slack_team_name');
		})
		.createTable('SlackUser',(table)=>{
			table.increments();
			table
				.integer('user_id')
				.references('user_id')
				.inTable('UserProfile')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table
				.integer('tenant_id')
				.references('tenant_id')
				.inTable('TenantProfile')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table
				.string('slack_user_id')
				.references('slack_user_id')
				.inTable('SlackWorkspace')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		})
		.createTable('Template', (table) => {
			table.increments('id');
			table.string('notification_template').notNullable();
			table.integer('method_id').references('id').inTable('Method').onDelete('SET NULL').onUpdate('CASCADE');
			table.integer('event_id').references('id').inTable('Event').onDelete('SET NULL').onUpdate('CASCADE');
			table.unique(['method_id', 'event_id']);
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema
		.dropTable('Subscription')
		.dropTable('Event')
		.dropTable('Method')
		.dropTable('UserProfile')
		.dropTable('TenantProfile')
		.dropTable('UserTeam')
		.dropTable('SlackUser')
		.dropTable('SlackWorkspace')
		.dropTable('Template')
};

