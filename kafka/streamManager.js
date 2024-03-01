const Subscription = require('../database/models/Subscription');
const dbConfig = require('../database/DatabaseConfig');
const Mustache = require('mustache');
const { notificationController } = require('../controllers')
const { connectMongo, disconnectMongo } = require('../database/mongoConnection');
const { KafkaKeys } = require('../utility/KeyMaster');
const { data2 } = require('../sample_data/data');
const {slackController} = require('../controllers');
const notificationManager = require('../utility/NotificationManager');

dbConfig.initializeDB();
connectMongo();

const handleEvent = async (eventType , eventData) => {
	try {
		// query to fetch the subscribed methods , templates againt the receivers
		const subscriptions = await Subscription.query()
				.joinRelated('event')
				.where('event.name', eventType)
				.whereIn('user_id', eventData.properties.receivers)
				.where('tenant_id', eventData.tenant_id)
				.withGraphFetched('[user_profile, event.[templates], method]')

		for (const subscription of subscriptions){
			const { user_profile, event: { templates }, method } = subscription;	
			const template = templates.find(template => template.method_id === method.id);

			if (template) {
				const message = Mustache.render(template.notification_template, { ...eventData.properties });
				
				switch(method.name){
					case 'in_app':
						console.log('sending notification to inapp');
						const notification_result = {
							user_id: user_profile.user_id,
                            tenant_id: eventData.tenant_id,
                            event: eventType,
                            message: message,
                            metadata: eventData.properties,
						}
				        const { result, error } = await notificationController.create([notification_result]);
						if (error) {
							console.log('error: ', error);
						} else if (result) {
							console.log('notification created: ', result);
						}
						break;
						
					case 'slack':
						// console.log('sending notification to slack', message);
						const resp = slackController.message(user_profile.user_id , message);					
						break;
					case 'email':
						console.log('sending notification to email');
						try{
							await notificationManager.sendEmail(eventType, message, eventData.properties);
						}catch(error){
							console.log(error);
						}
						break;
					default:
						console.log('no method is available')
						break;
				}
			} else {
				console.log(`Template Not Found against the method:${method.name}`)
			}
		}

	} catch (error) {
		console.log('error', error)
	}
}

const streamProcessor = async (data) => {
	try {
		await handleEvent(data.event , data)
	} catch(error) {
		console.log(error)
	}
}

const sensitiveStreamProcess = async (data) => {
	try {
		await handleEvent(data.event , data);
	} catch(error) {
		console.log(error);
	}
}

// streamProcessor(data2)
sensitiveStreamProcess(data2);