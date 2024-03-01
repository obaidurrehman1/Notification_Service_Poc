exports.seed = async function (knex) {
	try {
		await knex('Method')
			.insert([
				{ id: 1, name: 'In App' }, //This one seems useless. It was not removed because i fear it might break something.
				{ id: 2, name: 'email' },
				{ id: 3, name: 'push' },
				{ id: 4, name: 'sms' },
				{ id: 5, name: 'in_app' },
				{ id: 6, name: 'slack' },
			])
			.onConflict('name')
			.ignore();
	} catch (err) {
		console.log(err);
	}
};
