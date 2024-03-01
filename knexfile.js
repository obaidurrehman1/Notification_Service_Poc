module.exports = {
	client: 'pg',
	connection: {
		host: 'localhost',
		user: 'postgres',
		password: 'venturenox',
		database: 'notification',
		timezone: 'UTC',
	},

	migrations: {
		directory: __dirname + '/database/migrations',
	},
	seeds: {
		directory: __dirname + '/database/seeds',
	},
};
