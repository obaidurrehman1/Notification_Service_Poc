const {Notification} = require('../database/schema/Model');

module.exports = {
	create: async (body) => {
		try {
			const data = await Notification.insertMany(body);
			return {
				result: {
					status: 201,
					data: data,
				},
			};
		} catch (err) {
			return { error: err };
		}
	},
}