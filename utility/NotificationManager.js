const NotifmeSdk = require('notifme-sdk').default;
const Mustache = require('mustache');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const notifmeSdk = new NotifmeSdk({
	channels: {
		email: {
			providers: [
				{
					type: 'mailgun',
					apiKey: 'af5af9fd68ed1420d58a3b3b0803adbc-b7b36bc2-947a6d4a',
					domainName: 'sandbox1015f528425d4bbd97b3f5f1a8d26a58.mailgun.org',
				},
			],
		},
	},
});

const mailgun = new Mailgun(formData);

const mailgunClient = mailgun.client({
	username: 'obaid ur rehman',
	key: 'af5af9fd68ed1420d58a3b3b0803adbc-b7b36bc2-947a6d4a',
});

const sendEmail = async (eventType , message , properties) => {
	try {

		// logger.info( properties );
		// if (!templates[event]) {
		// 	return {
		// 		error: { status: 404, data: 'Invalid data' },
		// 	};
		// }
		// console.log(properties.email);
		// const mailValidation = await mailgunClient.validate.get(properties.email);
		// console.log('mail_validation', mailValidation);
		// logger.info({ mailValidation });

		
		// if (mailValidation.result === 'undeliverable') {
		// 	throw new Error('Cannot deliver mail ot this address');
		// }

		// if (process.env.NODE_ENV !== 'production') {
		// 	if (
		// 		mailValidation.result !== 'deliverable' &&
		// 		mailValidation.risk !== 'low'
		// 	) {
		// 		// logger.error({ mailValidation });
		// 		throw new Error('Cannot deliver mail ot this address');
		// 		// console.error('Cannot deliver mail ot this address');
		// 		// return;
		// 	}
		// }

		// console.log({ mailValidation });

		// if (process.env.NODE_ENV === 'development') return;

		// Subject based on event
		// let subject = '';
		if(eventType == 'user_created'){
			subject = 'Welcome to Levvy — Confirm your Email to Get Started!';
			console.log(subject);
		}
		// else if(event == KafkaKeys.ACTIVATION_TOKEN_REQUESTED){
		// 	const user = await UserProfile.query().where('user_id', properties.user_id);
		// 	properties['name'] = user[0].full_name;
		// 	subject = 'Don’t Forget to Activate Your Levvy Account — Confirm your Email to Get Started!';
		// }
		// else if(event == KafkaKeys.USER_ADDED){
		// 	const user = await UserProfile.query().where('user_id', properties.owner_user.id);
		// 	properties['invitee_name'] = user[0].full_name;
		// 	subject = `${user[0].full_name} has invited you to work with them in Levvy`;
		// }
		// else if(event == KafkaKeys.RESET_PASSWORD){
		// 	const user = await UserProfile.query().where('user_id', properties.user_id);
		// 	properties['name'] = user[0].full_name;
		// 	subject = 'Reset your Levvy Password';
		// }

		const data = await notifmeSdk.send({
			email: {
				from: 'Levvy <noreply@levvy.com>',
				to: properties.email,
				subject,
				// subject: upperCaseWords(event.replace(/_/g, ' ')),
				html: message,
			},
		});

		return {
			result: { status: 200, data: data},
		};
	} catch (error) {
		console.log('sendEmail Error', error);
		return { error: { status: 422, message: error.message } };
	}
};

module.exports = { sendEmail };
