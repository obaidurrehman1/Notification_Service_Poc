const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
	{
		user_id: {
			type: Number,
			required: [true, 'User id is required'],
		},

		tenant_id: {
			type: Number,
			required: [true, 'Tenant id is required'],
		},

		status: {
			type: String,
			enum: {
				values: ['READ', 'UNREAD'],
				message: '{VALUE} is not supported',
			},
			default: 'UNREAD',
		},

		event: {
			type: String,
			required: [true, 'Event Type is required'],
		},

		message: {
			type: String,
			required: [true, 'Message body is required'],
		},

		metadata: {
			type: Object,
		},
	},
	{ timestamps: true }
).set('toJSON', {
	virtuals: true,
	transform: (doc, ret) => {
		delete ret._id;
	},
});

const Notification = mongoose.model('notification', notificationSchema);
module.exports = { Notification };