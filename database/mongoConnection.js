const mongoose = require('mongoose');
const MONGO_USERNAME = 'obaidrehman';
const MONGO_PASSWORD ='rIfN1IMLKHnMsrsz';
const MONGO_HOST = 'cluster0.xvjjqdc.mongodb.net';
const MONGO_NOTIFICATION_DB = 'notification';
const connectMongo = async () => {
	try {
		// mongoose.Promise = global.Promise;
		// mongodb+srv://<username>:<password>@dev.xy2ib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
		// const dbURI = 'mongodb+srv://' + MONGO_USERNAME + ':' + MONGO_PASSWORD + '@' + MONGO_HOST + '/' + MONGO_NOTIFICATION_DB + '?retryWrites=true&w=majority';
		// const dbURI = 'mongodb+srv://stagingdbuser:9Tr7RXmUHjZPiA2Y@levvy-staging.byycm5v.mongodb.net/levvy?retryWrites=true&w=majority';
		
		const dbURI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_NOTIFICATION_DB}?retryWrites=true&w=majority`;
		await mongoose.connect(dbURI, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			// useCreateIndex: true,
			// useFindAndModify: false,
		});
		console.log('database connected successfully');
		// const db = mongoose.connection;
		// db.on('error', error =>
		// 	console.log(error)
		// );
		// db.once('open', () =>
		// 	console.log('connected to Mongo db')
		// );
	} catch (err) {
		console.log('Mongo DB Connection Error:', err);
		//process.exit(1)        
	}
};

const disconnectMongo = async () => {
	try {
		mongoose.disconnect();
	} catch (error) {
		console.log(error);
	}
};
module.exports = { connectMongo, disconnectMongo };